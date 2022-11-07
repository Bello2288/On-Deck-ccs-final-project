from rest_framework import generics
from . import models
from . import serializers
from .permissions import IsUserOrReadOnly



class ProfileListAPIView(generics.ListCreateAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsUserOrReadOnly,)
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

