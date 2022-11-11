from rest_framework import generics
from . import models
from . import serializers
from .permissions import IsUserOrReadOnly
from django.shortcuts import get_object_or_404



class ProfileListAPIView(generics.ListCreateAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsUserOrReadOnly,)
    queryset = models.Profile.objects.filter()
    serializer_class = serializers.ProfileSerializer

    def get_object(self):
        user = self.kwargs['pk']
        return get_object_or_404(models.Profile, user=user)




