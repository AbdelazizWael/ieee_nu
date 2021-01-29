from django.db.models.signals import pre_save
from django.dispatch import receiver

from .models import Cart, Product


@receiver(pre_save, sender=Cart)
def sort_values(sender, instance, *args, **kwargs):
    product = Product.objects.get(id=instance.product.id)
    product.count -= instance.count
    instance.compound_price = instance.count * product.price
    product.save()
