from django.http import HttpResponse
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework import serializers, views, permissions, response, status


from .models import User
from .serializers import UserSerializer


def empty_view(request):
    return HttpResponse('')


class UserDetails(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class IsStaff(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if request.user.is_staff == True:
            return response.Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
