from django.urls import include, path
from dj_rest_auth.registration.views import VerifyEmailView

from .views import empty_view

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('register/', include('dj_rest_auth.registration.urls')),
    path('dj-rest-auth/account-confirm-email/', VerifyEmailView.as_view(),
         name='account_email_verification_sent'),
    path('accounts/', include('allauth.urls')),
    path('password-reset/<uidb64>/<token>/',
         empty_view, name='password_reset_confirm'),
]
