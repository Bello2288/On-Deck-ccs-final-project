from rest_framework import serializers
from . import models
from dj_rest_auth.models import TokenModel
# from phone_field import PhoneField

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = models.Profile
        fields = '__all__'


class TokenSerializer(serializers.ModelSerializer):
    is_superuser = serializers.ReadOnlyField(source='user.is_superuser')
    id = serializers.ReadOnlyField(source='user.id')
    user_avatar = serializers.ImageField(source='user.profile.avatar')
    username = serializers.ReadOnlyField(source='user.profile.username')
    user_profile_id = serializers.ReadOnlyField(source='user.profile.id')
    # phone_number = serializers.(source='user.profile.phone_number')
    # phone_number = PhoneField(source='user.profile.phone_number', blank=True, help_text='Contact phone number')

    class Meta:
        model = TokenModel
        fields = ('key', 'is_superuser', 'id', 'user_avatar', 'username', 'user_profile_id', )



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