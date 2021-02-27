from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('grappelli/', include('grappelli.urls')),  # grappelli URLS
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/store/', include('store.urls')),
    path('login/', TemplateView.as_view(template_name='index.html'), name='login'),
    re_path('.*', TemplateView.as_view(template_name='index.html'), name='home'),
]
