from django.http import HttpResponse
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework import status, views, response


from .models import *
from .serializers import *


def empty_view(request):
    return HttpResponse('')


class AdminProfileDetails(ReadOnlyModelViewSet):
    """
    List all the users.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser]


class ProfileDetail(views.APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get(self, request, *args, **kwargs):
        profile = self.get_profile()
        inst = self.serializer_class(profile)
        return response.Response(
            data=inst.data,
            status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        val = self.validate_data(request.data)
        if val:
            return val

        profile = self.get_profile()
        inst = self.serializer_class(instance=profile, data=request.data)
        val = inst.is_valid()
        if val:
            inst.save()
            return response.Response(
                data=inst.data,
                status=status.HTTP_200_OK
            )
        else:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)

    def validate_data(self, data):
        fields = ['phone_number', 'first_name', 'last_name']

        for field in fields:
            if not data.get(field):
                return response.Response(
                    data={field: 'This field is required.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return None

    def get_profile(self):
        return Profile.objects.get(user=self.request.user)
