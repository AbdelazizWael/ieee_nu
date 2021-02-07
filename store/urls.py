from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()

router.register(r'products', ProductViewset, 'product')
router.register(r'carts', CartViewset, 'cart')
router.register(r'orders', UserOrderViewset, 'order')
router.register(r'history', UserHistoryViewset, 'history')
router.register(r'all-orders', AdminOrderViewset, 'all-order')
router.register(r'all-history', AdminHistoryViewset, 'all-history')

urlpatterns = [
    path('categories/', CategoriesView.as_view(), name='categories'),
    path('delete-carts/', DeleteCarts.as_view(), name='delete-carts'),
    path('place-order/', PlaceOrder.as_view(), name='place-order'),
    path('verify-order/', VerifyOrder.as_view(), name='verify-order'),
]

urlpatterns += router.urls
