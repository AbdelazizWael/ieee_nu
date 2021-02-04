from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

from .models import User


@receiver(pre_save, sender=User)
def add_full_name(sender, instance, *args, **kwargs):
    instance.full_name = instance.first_name + ' ' + instance.last_name
