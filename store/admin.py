from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from .models import Product, Cart, Purchase


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('name', 'description', ('price', 'count'), 'image')}),
        (_('Meta Data'), {'fields': ('created', 'last_modified')}),
    )
    readonly_fields = ('created', 'last_modified')
    list_display = ('name', 'price', 'count', 'created')
    search_fields = ('name', )
    ordering = ('name', )


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('customer', 'product',
                           'count', 'verified', 'compound_price')}),
        (_('Meta Data'), {'fields': ('added',)}),
    )
    readonly_fields = ('added', )
    list_display = ('customer', 'product', 'count',
                    'verified', 'compound_price')
    search_fields = ('customer', 'verified')
    ordering = ('customer', 'verified')


@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    readonly_fields = ('verified_on', 'verified_by')
    list_display = ('customer', 'products', 'full_price')
    fieldsets = (
        (None, {'fields': list_display}),
        (_('Meta Data'), {'fields': readonly_fields}),
    )
    search_fields = ('customer', )
    ordering = ('customer', )
