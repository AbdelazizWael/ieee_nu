from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import *

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['name']


class ProductSerializer(serializers.ModelSerializer):
    categories = serializers.StringRelatedField(many=True)

    class Meta:
        model = Product
        exclude = ['created', 'delivery_duration']


class _ProductCustomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'image']


class CartSerializer(serializers.ModelSerializer):
    product = _ProductCustomSerializer(read_only=True)

    class Meta:
        model = Cart
        exclude = ['customer', 'previous_count', 'order']
        read_only_fields = ['compound_price']
        depth = 1


class _CartCustomSerializer(serializers.ModelSerializer):
    product = _ProductCustomSerializer(read_only=True)

    class Meta:
        model = Cart
        fields = ['product', 'count', 'compound_price']


class OrderSerializer(serializers.ModelSerializer):
    carts = _CartCustomSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'carts', 'full_price', 'placed', 'delivery_time']


class HistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = History
        exclude = ['customer', 'verified_by']


class _UserCustomSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'full_name']


class AdminOrderSerializer(serializers.ModelSerializer):
    carts = _CartCustomSerializer(many=True, read_only=True)
    customer = _UserCustomSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'


class AdminHistorySerializer(serializers.ModelSerializer):
    customer = _UserCustomSerializer(read_only=True)
    verified_by = _UserCustomSerializer(read_only=True)

    class Meta:
        model = History
        fields = '__all__'
