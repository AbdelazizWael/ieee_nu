from django.db.models import signals, ObjectDoesNotExist
from django.dispatch import receiver

from .models import *


def check_sales_count(sales):
    full = sales.on_hold + sales.ordered + sales.stocked + sales.sold
    assert full == sales.total_count, "Error in sales count " + sales.product


@receiver(signals.post_save, sender=Product)
def create_sales_instance(instance, *args, **kwargs):
    """
    When creating a product instance, create a Sales instance associated
    with it. If a product is updated, re-assign product name and price in case of a any changes.
    """
    try:
        if instance.sales:
            s = Sales.objects.get(product=instance)
            s.product_name = instance.name
            s.product_price = instance.price
            s.save()
    except ObjectDoesNotExist:
        s = Sales(product=instance, product_name=instance.name,
                  product_price=instance.price)
        s.save()


@receiver(signals.pre_save, sender=Cart)
def sort_cart_data_on_save(instance, *args, **kwargs):
    """
    Sort the data for a cart object and its associated product sales.
    """
    # Calculate the compound price.
    instance.compound_price = instance.count * instance.product.price

    # Update the sales data
    sales = instance.product.sales

    # If the cart is being linked to an order, then move count from on_hold to ordered
    if instance.order:
        sales.on_hold -= instance.count
        sales.ordered += instance.count

    else:
        count = instance.count - instance.previous_count
        sales.stocked -= count
        sales.on_hold += count

    # Assert that there are no miscalculations
    check_sales_count(sales)

    sales.save()

    # Update the previous count
    instance.previous_count = instance.count


@receiver(order_verified, sender=Cart)
def sort_verified_order_sales(instance, *args, **kwargs):
    """
    Sort the sales data on order verification.
    """
    sales = instance.product.sales
    count = instance.count
    sales.ordered -= count
    sales.sold += count

    # Assert that there are no miscalculations
    check_sales_count(sales)

    sales.save()


@receiver(cart_removed, sender=Cart)
def sort_cart_sales_on_delete(instance, *args, **kwargs):
    """
    Sort the sales data on cart deletion.
    """
    sales = instance.product.sales
    count = instance.count
    sales.on_hold -= count
    sales.stocked += count

    # Assert that there are no miscalculations
    check_sales_count(sales)

    sales.save()


@receiver(order_canceled, sender=Cart)
def sort_canceled_order_sales(instance, *args, **kwargs):
    """
    Sort the sales data on order cancelation.
    """
    sales = instance.product.sales
    count = instance.count
    sales.ordered -= count
    sales.stocked += count

    # Assert that there are no miscalculations
    check_sales_count(sales)

    sales.save()


@receiver(signals.pre_save, sender=Sales)
def add_to_stocked(instance, *args, **kwargs):
    """
    Add any new products to the stocked column automatically.
    """
    in_circ = instance.stocked + instance.on_hold + \
        instance.ordered + instance.sold
    additions = instance.total_count - in_circ
    instance.stocked += additions

    # Assert that there are no miscalculations
    check_sales_count(instance)
