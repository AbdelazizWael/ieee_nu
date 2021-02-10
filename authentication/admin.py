from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _


from .models import *


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('email', ('first_name',
                                     'last_name'), 'full_name', 'phone_number')}),
        (_('Meta Data'), {'fields': ('added', 'last_modified')}),
    )
    readonly_fields = ('email', 'full_name', 'phone_number',
                       'added', 'last_modified')
    list_display = ('full_name', 'email', 'phone_number')
    search_fields = ('full_name', 'email')
    ordering = ('full_name', 'email')
