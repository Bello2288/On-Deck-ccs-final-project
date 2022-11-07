from rest_framework import serializers
from . import models
from dj_rest_auth.models import TokenModel

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = models.Profile
        fields = '__all__'


class TokenSerializer(serializers.ModelSerializer):
    is_superuser = serializers.ReadOnlyField(source='user.is_superuser')
    id = serializers.ReadOnlyField(source='user.id')
    user_avatar = serializers.ImageField(source='user.profile.avatar')
    user_profile = serializers.ReadOnlyField(
        source='user.profile.id')

    class Meta:
        model = TokenModel
        fields = ('key', 'is_superuser', 'id', 'user_avatar', 'user_profile',)



# class UserProfileSerializer(serializers.ModelSerializer):
#     username = serializers.ReadOnlyField(source='user.username')

#     class Meta:
#         model = models.Profile
#         fields = '__all__'

# class TeamProfileSerializer(serializers.ModelSerializer):
#     username = serializers.ReadOnlyField(source='user.username')

#     class Meta:
#         model = models.Profile
#         fields = '__all__'


# class TokenSerializer(serializers.ModelSerializer):
#     is_superuser = serializers.ReadOnlyField(source='user.is_superuser')
#     id = serializers.ReadOnlyField(source='user.id')

#     class Meta:
#         model = TokenModel
#         fields = ('key', 'is_superuser', 'id',)