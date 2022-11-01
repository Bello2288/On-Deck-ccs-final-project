from rest_framework import generics
from . import models
from . import serializers

class ProfileListAPIView(generics.ListCreateAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# class UserProfileListAPIView(generics.ListCreateAPIView):
#     queryset = models.UserProfile.objects.all()
#     serializer_class = serializers.UserProfileSerializer

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)


# class TeamOrganizerProfileListAPIView(generics.ListCreateAPIView):
#     queryset = models.TeamOrganizerProfile.objects.all()
#     serializer_class = serializers.TeamProfileSerializer

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)
