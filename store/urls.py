from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (ProductViewset,
                    CartViewset,
                    ListUserCart,
                    VerifyPurchase,
                    PurchaseViewset)

router = DefaultRouter()
router.register(r'products', ProductViewset)
router.register(r'cart', CartViewset, basename='cart')
router.register(r'purchases', PurchaseViewset, basename='purchases')

urlpatterns = [
    path('user-cart/', ListUserCart.as_view(), name='admin-list-cart'),
    path('verify-purchase/', VerifyPurchase.as_view(), name='verify-purchase')
]

urlpatterns += router.urls
