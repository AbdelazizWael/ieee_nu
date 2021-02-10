from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from .mails import *
from .models import *
from .serializers import *


class CategoriesView(APIView):
    """
    List all the categories.
    """
    pagination_class = None
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        queryset = Category.objects.all()

        cats = []
        for q in queryset:
            cats.append(q.name)

        return Response(
            data=cats,
            status=status.HTTP_200_OK
        )


class ProductViewset(ReadOnlyModelViewSet):
    """
    List all the products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        """
        Filter results based on search parameters.
        """
        queryset = self.filter_queryset(self.get_queryset())

        # Search by name queries.
        q = request.query_params.get('q', None)
        if q:
            queryset = queryset.filter(name__icontains=q)

        # Filter by categories.
        cats = request.query_params.getlist('category', None)
        if cats:
            for cat in cats:
                queryset = queryset.filter(categories__name__iexact=cat)

        # Paginate.
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class CartViewset(ModelViewSet):
    """
    List, add, update, or delete the carts of the user.
    """
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(customer=self.request.user, order=None)

    def perform_create(self, serializer):
        """
        Add the customer and product to the cart.
        """
        user = self.request.user
        product_id = self.request.data.get('product_id')
        product = Product.objects.get(pk=product_id)
        serializer.save(customer=user, product=product)

    def create(self, request, *args, **kwargs):
        """
        Validate created carts.
        """
        product_id = request.data.get('product_id')
        product = Product.objects.get(pk=product_id)

        # Check if the user has a cart with this product. If so, add the updates to that cart.
        # This prevents duplicate carts.
        user_carts = Cart.objects.filter(customer=request.user, order=None)
        for cart in user_carts:
            if cart.product == product:
                inst = self.get_serializer(cart)
                return Response(
                    data={"cart": inst.data},
                    status=status.HTTP_303_SEE_OTHER
                )

        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        cart = self.get_object()
        cart.send_cart_removed()
        return super().destroy(request, *args, **kwargs)


class UserOrderViewset(ReadOnlyModelViewSet):
    """
    List all orders of the user.
    """
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)


class UserHistoryViewset(ReadOnlyModelViewSet):
    """
    List the purchase history of the user.
    """
    serializer_class = HistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return History.objects.filter(customer=self.request.user)


class PlaceOrder(APIView):
    """
    Process the placing of orders by users.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        customer = request.user
        # Get all carts that are not in orders
        carts = Cart.objects.filter(customer=customer, order=None)
        if not carts:
            return Response(
                data={'detail': 'No active carts to place in an order.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        full_price = sum([cart.compound_price for cart in carts])
        order = Order(
            customer=customer,
            full_price=full_price,
        )
        order.save()

        # Add the order as a Foreign Key in the cart.
        for cart in carts:
            cart.order = order
            cart.save()

        # If there is no delivery time, or the user inputted a delivery time
        # that is before the default time, reject it and add the default time.
        try:
            dt = request.data.get('delivery_time')
        except Exception:
            dt = None

        delivery_duration = max(
            [cart.product.delivery_duration for cart in order.carts.all()])

        default_dt = timezone.now() + delivery_duration
        if not dt or default_dt < dt:
            order.delivery_time = default_dt
        else:
            order.delivery_time = dt

        order.save()

        # Send confirmation mail.
        send_order_confirmation_mail(customer, order)

        inst = OrderSerializer(order)
        return Response(data=inst.data, status=status.HTTP_201_CREATED)


class AdminOrderViewset(ReadOnlyModelViewSet):
    """
    List the orders of all users.
    """
    serializer_class = AdminOrderSerializer
    permission_classes = [IsAdminUser]
    queryset = Order.objects.all()


class AdminHistoryViewset(ReadOnlyModelViewSet):
    """
    List the purchase history of all users.
    """
    serializer_class = AdminHistorySerializer
    permission_classes = [IsAdminUser]
    queryset = History.objects.all()


class VerifyOrder(APIView):
    """
    Verify that the order of the user is done and move it to History.
    """
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        order_id = request.data.get('order_id')
        try:
            order = Order.objects.get(pk=order_id)
        except Exception:
            return Response(
                data={'detail': 'No such order exists!'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Extract products.
        products = []
        for cart in order.carts.all():
            prod = {
                'name': cart.product.name,
                'price': cart.product.price,
                'count': cart.count,
                'compound_price': cart.compound_price
            }
            products.append(prod)
            cart.send_order_verified()

        history = History(
            products=products,
            customer=order.customer,
            full_price=order.full_price,
            verified_by=request.user
        )
        history.save()

        # Send receipt mail.
        send_order_receipt_mail(order.customer, history)

        # Delete order.
        order.delete()

        return Response(status=status.HTTP_202_ACCEPTED)


class DeleteCarts(APIView):
    """
    Delete all the cart items on logout.
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        carts = Cart.objects.filter(customer=request.user, order=None)
        for cart in carts:
            cart.send_cart_removed()
            cart.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class CancelOrder(APIView):
    """
    Cancel an order.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        order_id = request.data.get('order_id')
        order = Order.objects.get(pk=order_id)

        # Get all the carts and send the order_canceled signal
        carts = order.carts.all()
        for cart in carts:
            cart.send_order_canceled()

        # Send confirmation mail.
        send_order_cancelation_mail(request.user, order)

        order.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
