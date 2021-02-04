from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

from .models import *


@receiver(pre_save, sender=Cart)
def sort_data(sender, instance, *args, **kwargs):
    """
    Sort the data for a cart object and its associated product.
    """
    product = Product.objects.get(id=instance.product.id)
    # Update the count of the product.
    product.count -= (instance.count - instance.previous_count)
    instance.previous_count = instance.count
    # Calculate the compound price.
    instance.compound_price = instance.count * product.price
    product.save()


@receiver(post_delete, sender=Cart)
def restore_product_count(sender, instance, *args, **kwargs):
    """
    Restore the product count if a cart is deleted.
    """
    product = Product.objects.get(id=instance.product.id)
    product.count += instance.count
    product.save()
