from rest_framework import generics
from posts import models
from . import models
from . import serializers
from django.db.models import Q
from .permissions import IsAdminOrReadOnly, IsAuthorOrReadOnly
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view
from rest_framework.response import Response

import os
from twilio.rest import Client


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
        return models.Post.objects.filter(Q(author=self.request.user) | Q(reserved_by=self.request.user))

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

@api_view(['PUT', 'PATCH']) 
def post_reserve(request, pk):
    post = models.Post.objects.get(id=pk)
    post_author = models.Post.author
    post.reserved_by = request.user
    post.status = "TKS"
    post.save()
    serializer = serializers.PostSerializer(post)

    account_sid = os.environ['TWILIO_ACCOUNT_SID'] 
    auth_token = os.environ['TWILIO_AUTH_TOKEN'] 
    my_phone_number = os.environ['MY_PHONE_NUMBER']   
    twilio_phone_number = os.environ['TWILIO_PHONE_NUMBER']  
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to=my_phone_number,
        from_=twilio_phone_number,
        body="You are confirmed for the game by" 
    )

    message = client.messages.create(
        to=my_phone_number,
        from_=twilio_phone_number,
        body="Username:" + str(post.reserved_by) + " has reserved your post -" + str(post)
    )
    print(post_author)

    return Response(serializer.data)

@api_view(['PUT', 'PATCH'])    
def remove_reserve(self,pk):
    post = models.Post.objects.get(id=pk)
    post.reserved_by = None
    post.status = "PST"
    post.save()
    serializer = serializers.PostSerializer(post)
    return Response(serializer.data)

@api_view(['PUT', 'PATCH']) 
def send_message(self,pk):
    post = models.Post.objects.get(id=pk)

    account_sid = os.environ['TWILIO_ACCOUNT_SID'] 
    auth_token = os.environ['TWILIO_AUTH_TOKEN'] 
    my_phone_number = os.environ['MY_PHONE_NUMBER']   
    twilio_phone_number = os.environ['TWILIO_PHONE_NUMBER']  
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        # the creator's phone number (mine for testing)
        to=my_phone_number,
        # from the phone number set up in my free Twilio account
        from_=twilio_phone_number,
        body="Hello from Python!"
)

    post.save()
    serializer = serializers.PostSerializer(post)
    return Response(serializer.data)

print('sent')