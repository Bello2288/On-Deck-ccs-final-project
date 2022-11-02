from rest_framework import generics
from posts import models
from . import models
from . import serializers
from django.db.models import Q
from .permissions import IsAdminOrReadOnly, IsAuthorOrReadOnly
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class PostListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAdminOrReadOnly,)
    queryset = models.Post.objects.order_by('-created_at')
    serializer_class = serializers.PostSerializer

    def get_queryset(self):
        return models.Post.objects.filter(status='PST')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer


class AuthorPostListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.PostSerializer

    def get_queryset(self):
        return models.Post.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class AdminPostListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAdminUser,)
    queryset = models.Post.objects.order_by('-created_at')
    serializer_class = serializers.PostSerializer

    def get_queryset(self):
        return models.Post.objects.filter(Q(status='PST') | Q(status='SUB') | Q(status='ARC'))

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)  