from dataclasses import fields
from rest_framework import serializers
from . import models


class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = models.Post
        fields = '__all__'