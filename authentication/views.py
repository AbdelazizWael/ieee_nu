from django.http import HttpResponse
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import User
from .serializers import UserSerializer


def empty_view(request):
    return HttpResponse('')


class UserDetails(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
