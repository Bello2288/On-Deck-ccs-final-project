from dataclasses import fields
from rest_framework import serializers
from . import models


class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    reserved_by_username = serializers.ReadOnlyField(source='reserved_by.username')

    class Meta:
        model = models.Post
        fields = '__all__'