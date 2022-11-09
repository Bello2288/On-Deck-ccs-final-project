from rest_framework import generics
from posts import models
from . import models
from . import serializers
from django.db.models import Q
from .permissions import IsAdminOrReadOnly, IsAuthorOrReadOnly
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view
from rest_framework.response import Response


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
        return models.Post.objects.filter(Q(status='PST') | Q(status='SUB') | Q(status='ARC') | Q(status='TKS'))

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)  

@api_view(['PUT'])
def post_reserve(request, pk):
    post = models.Post.objects.get(id=pk)
    post.reserved_by = request.user
    post.save()
    serializer = serializers.PostSerializer(post)
    return Response(serializer.data)