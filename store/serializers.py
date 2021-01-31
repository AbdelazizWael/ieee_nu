from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Product, Cart, Purchase


class ProductSerializer(ModelSerializer):

    class Meta:
        model = Product
        exclude = ['created', 'last_modified']


class CartSerializer(ModelSerializer):
    customer_id = serializers.PrimaryKeyRelatedField(
        source='customer.pk', read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        source='product.pk', read_only=True)

    class Meta:
        model = Cart
        exclude = ['customer', 'product']
        read_only_fields = ['compound_price']


class _ProductCustomSerializer(ModelSerializer):

    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'image']


class AdminCartSerializer(ModelSerializer):
    product = _ProductCustomSerializer()

    class Meta:
        model = Cart
        fields = ['count', 'product', 'compound_price']
        depth = 1


class PurchaseSerializer(ModelSerializer):

    class Meta:
        model = Purchase
        fields = ['id', 'products', 'full_price', 'verified_on']
        read_only_fields = fields
