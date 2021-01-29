from rest_framework.serializers import ModelSerializer

from .models import Product, Cart, Purchase


class ProductSerializer(ModelSerializer):

    class Meta:
        model = Product
        exclude = ['created', 'last_modified']


class CartSerializer(ModelSerializer):

    class Meta:
        model = Cart
        fields = '__all__'
        read_only_fields = ['customer']


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
        fields = ['products', 'full_price', 'verified_on']
        read_only_fields = fields
