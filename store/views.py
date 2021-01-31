from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

from authentication.models import User
from .models import Product, Cart, Purchase
from .serializers import (ProductSerializer,
                          CartSerializer,
                          AdminCartSerializer,
                          PurchaseSerializer)


class ProductViewset(ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


class CartViewset(ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Cart.objects.filter(customer=self.request.user)
        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        product_id = self.request.data.get('product_id')
        product = Product.objects.get(pk=product_id)
        serializer.save(customer=user, product=product)

    def create(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        count = request.data.get('count')
        product = Product.objects.get(pk=product_id)

        if (int(product.count) < int(count)):
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={"details": "Requested product count exceeds the available number."})
        else:
            return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        cart = self.get_object()
        previous_count = cart.previous_count
        product = cart.product
        count = request.data.get('count')

        if (count and (int(product.count) + int(previous_count) < int(count))):
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={"details": "Requested product count exceeds the available number."})
        else:
            return super().update(request, *args, **kwargs)


class ListUserCart(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, format=None):
        user_pk = request.query_params.get('pk')
        user_cart = Cart.objects.filter(customer__pk=user_pk, verified=True)
        if (user_cart):
            cart = AdminCartSerializer(user_cart, many=True)
            full_price = self.calc_full_price(user_cart)
            data = {'products': cart.data, 'full_price': full_price}
            return Response(data=data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def calc_full_price(self, cart):
        full_price = 0
        for q in cart:
            full_price += q.compound_price
        return full_price


class PurchaseViewset(ReadOnlyModelViewSet):
    serializer_class = PurchaseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Purchase.objects.filter(customer=self.request.user)
        return queryset


class VerifyPurchase(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        try:
            prods = json.loads(request.data.get('user_list'))
            products = prods['products']
            full_price = prods['full_price']
            customer = User.objects.get(pk=request.data.get('customer_id'))
            verified_by = request.user
            obj = Purchase(products=products,
                           full_price=full_price,
                           customer=customer,
                           verified_by=verified_by)
            obj.save()
            Cart.objects.filter(customer=customer, verified=True).delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
