from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from phone_field import PhoneField
from localflavor.us.models import USZipCodeField


class User(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    avatar = models.ImageField(upload_to='profiles/', default='blank_avatar.jpeg')
    first_name = models.CharField(max_length=225, null=True)
    last_name = models.CharField(max_length=225, null=True)
    email = models.EmailField(max_length=225, null=True)
    phone_number = PhoneField(blank=True, help_text='Contact phone number')
    zipcode = USZipCodeField(blank=True)

    def __str__(self):
        return self.user.username


# class UserProfile(models.Model):
#     user = models.OneToOneField(
#         settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
#     avatar = models.ImageField(upload_to='profiles/', default='blank_avatar.jpeg')
#     first_name = models.CharField(max_length=225)
#     last_name = models.CharField(max_length=225)
#     email = models.EmailField(max_length=225)
#     # phone_number = models.PhoneNumberField(null=True)

#     def __str__(self):
#         return self.user.username


# class TeamOrganizerProfile(models.Model):
#     user = models.OneToOneField(
#         settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
#     avatar = models.ImageField(upload_to='teamprofiles/', default='blank_avatar.jped')
#     first_name = models.CharField(max_length=225)
#     last_name = models.CharField(max_length=225)
#     email = models.EmailField(max_length=225)
#     # phone_number = models.PhoneNumberField(null=True)
#     team_name = models.CharField(max_length=225)
#     team_sport = models.CharField(max_length=225)
#     sport_center = models.CharField(max_length=225)

#     def __str__(self):
#         return self.user.username
