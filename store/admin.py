from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from .models import *

admin.site.register(Category)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('name', 'description', ('price', 'count'),
                           'categories', 'image', 'delivery_duration')}),
        (_('Meta Data'), {'fields': ('created',)}),
    )
    readonly_fields = ('created',)
    list_display = ('name', 'price', 'count')
    search_fields = ('name', )
    ordering = ('name', )


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('customer', 'product',
                           ('count', 'compound_price'), 'order')}),
        (_('Meta Data'), {'fields': ('added',)}),
    )
    readonly_fields = ('added', )
    list_display = ('customer', 'product', 'count',
                    'compound_price')
    search_fields = ('customer', 'product')
    ordering = ('customer',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ('placed', )

    fieldsets = (
        (None, {'fields': ('customer', 'carts', 'full_price', 'delivery_time')}),
    )
    list_display = ('customer', 'full_price', 'delivery_time')


@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    readonly_fields = ('verified_on', 'verified_by')
    list_display = ('customer', 'products', 'full_price')
    fieldsets = (
        (None, {'fields': list_display}),
        (_('Meta Data'), {'fields': readonly_fields}),
    )
    search_fields = ('customer', )
    ordering = ('customer', )
