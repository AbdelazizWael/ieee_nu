from django.db.models import signals
from django.dispatch import receiver
from allauth.account.signals import user_signed_up

from .models import *
from .serializers import *


@receiver(user_signed_up)
def add_profile(request, user, *args, **kwargs):
    profile = Profile(user=user, email=user.email)
    inst = ProfileSerializer(instance=profile, data=request.POST)
    inst.is_valid()
    inst.save()


@receiver(signals.pre_save, sender=Profile)
def add_full_name(instance, *args, **kwargs):
    """
    Add the user's full name to profile.
    """
    instance.full_name = instance.first_name + ' ' + instance.last_name
