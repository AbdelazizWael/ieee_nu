from rest_framework import serializers

from authentication.models import Profile
from .models import *


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


class _ProfileCustomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['email', 'full_name', 'phone_number']


class AdminOrderSerializer(serializers.ModelSerializer):
    carts = _CartCustomSerializer(many=True, read_only=True)
    customer = _ProfileCustomSerializer(
        read_only=True, source='customer.profile')

    class Meta:
        model = Order
        fields = '__all__'


class AdminHistorySerializer(serializers.ModelSerializer):
    customer = _ProfileCustomSerializer(
        read_only=True, source='customer.profile')
    verified_by = _ProfileCustomSerializer(
        read_only=True, source='verified_by.profile')

    class Meta:
        model = History
        fields = '__all__'
