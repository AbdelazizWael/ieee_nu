from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from import_export import resources
from import_export.admin import ExportMixin

from .models import *

admin.site.register(Category)


class ProductResource(resources.ModelResource):

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price',)
        export_order = fields


@admin.register(Product)
class ProductAdmin(ExportMixin, admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('name', 'description', 'price',
                           'categories', 'image', 'delivery_duration')}),
        (_('Meta Data'), {'fields': ('created',)}),
    )
    readonly_fields = ('created',)
    list_display = ('name', 'price')
    search_fields = ('name', )
    ordering = ('name', )

    resource_class = ProductResource


class CartResource(resources.ModelResource):

    class Meta:
        model = Cart
        fields = ('id', 'product__name', 'product__price', 'customer__email',
                  'customer__profile__full_name', 'count', 'compound_price', 'order__id')
        export_order = fields


@admin.register(Cart)
class CartAdmin(ExportMixin, admin.ModelAdmin):
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

    resource_class = CartResource


class OrderResource(resources.ModelResource):

    class Meta:
        model = Order
        fields = ('id', 'full_price', 'customer__email',
                  'customer__profile__full_name', 'placed', 'delivery_time')
        export_order = fields


@admin.register(Order)
class OrderAdmin(ExportMixin, admin.ModelAdmin):
    readonly_fields = ('placed', )

    fieldsets = (
        (None, {'fields': ('customer', 'carts', 'full_price', 'delivery_time')}),
    )
    list_display = ('customer', 'full_price', 'delivery_time')

    resource_class = OrderResource


class HistoryResource(resources.ModelResource):

    class Meta:
        model = History
        fields = ('id', 'products', 'customer__email',
                  'full_price', 'verified_on', 'verified_by__profile__full_name')
        export_order = fields


@admin.register(History)
class HistoryAdmin(ExportMixin, admin.ModelAdmin):
    readonly_fields = ('verified_on', 'verified_by')
    list_display = ('customer', 'products', 'full_price')
    fieldsets = (
        (None, {'fields': list_display}),
        (_('Meta Data'), {'fields': readonly_fields}),
    )
    search_fields = ('customer', )
    ordering = ('customer', )

    resource_class = HistoryResource


class SalesResource(resources.ModelResource):

    class Meta:
        model = Sales
        exclude = ('product')


@admin.register(Sales)
class SalesAdmin(ExportMixin, admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': (('product_name', 'product_price'),
                           'total_count', ('stocked', 'on_hold', 'ordered', 'sold'))}),
    )
    list_display = ('product_name', 'product_price', 'total_count',
                    'stocked', 'on_hold', 'ordered', 'sold')
    readonly_fields = ('on_hold', 'ordered', 'sold',
                       'product_name', 'product_price', 'stocked')
    search_field = ('product_name', )

    resource_class = SalesResource
