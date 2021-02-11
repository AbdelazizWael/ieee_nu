from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import PasswordResetSerializer
from rest_framework import serializers

from .models import *


class CustomPasswordResetSerializer(PasswordResetSerializer):
    def get_email_options(self):
        return {
            'email_template_name': 'password_reset_email.html'
        }


class CustomRegisterSerializer(RegisterSerializer):

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
        return {
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
        }


class ProfileSerializer(serializers.ModelSerializer):
    is_staff = serializers.CharField(source='user.is_staff', read_only=True)

    class Meta:
        model = Profile
        exclude = ['user']
        read_only_fields = ['email', 'full_name', 'added', 'last_modified']
        extra_kwargs = {'first_name': {'write_only': True},
                        'last_name': {'write_only': True}}
