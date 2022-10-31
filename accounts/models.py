from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
# from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    avatar = models.ImageField(upload_to='profiles/', default='blank_avatar.jpeg')
    # phone_number = PhoneNumberField(null=True)

    def __str__(self):
        return self.user.username
