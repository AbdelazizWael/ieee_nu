from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver

from .models import Cart, Product


@receiver(pre_save, sender=Cart)
def sort_counts(sender, instance, *args, **kwargs):
    product = Product.objects.get(id=instance.product.id)
    product.count -= (instance.count - instance.previous_count)
    instance.previous_count = instance.count
    instance.compound_price = instance.count * product.price
    product.save()


@receiver(post_delete, sender=Cart)
def restore_product_count(sender, instance, *args, **kwargs):
    product = Product.objects.get(id=instance.product.id)
    product.count += instance.count
    product.save()
