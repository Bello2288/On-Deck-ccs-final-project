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
    # post_author = Post.objects.all()
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
        body= "Thank you for your commit to (" + str(post) + "). You are reserved for the game. We have notified " + post.author.username +  " that you are able to attend."
    )

    message = client.messages.create(
        to=my_phone_number,
        from_=twilio_phone_number,
        body="Username: " + str(post.reserved_by) + " has committed to your post - (" + str(post) + ")"
    )
    # print(post_author)

    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])    
def remove_reserve(self,pk):
    post = models.Post.objects.get(id=pk)
    post.reserved_by = None
    post.status = "PST"
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
        body="You have cancelled your reserved spot for (" + str(post) + "). We have notified the creator " + post.author.username + " that their post has been resubmitted."
    )

    message = client.messages.create(
        to=my_phone_number,
        from_=twilio_phone_number,
        body="The player that committed to (" + str(post) + ") has cancelled. Your request has been reposted."
    )
    # print()

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
        to=my_phone_number,
        from_=twilio_phone_number,
        body="Hello from Python!"
)

    post.save()
    serializer = serializers.PostSerializer(post)
    return Response(serializer.data)

# print('sent')