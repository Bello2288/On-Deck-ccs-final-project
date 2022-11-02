from django.db import models
from django.conf import settings

class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    teamname = models.CharField(max_length=225, null=True)
    organization = models.CharField(max_length=225, null=True)
    location = models.CharField(max_length=255, null=True)
    # address_json = models.JSONField(null=True)
    # date = models.DateField(input_formats=("%d-%m-%Y"))
    # time = models.TimeField(input_formats=('%H:%M'))
    date = models.DateField()
    time = models.TimeField()
    notes = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    is_highlighted = models.BooleanField(default=False)


    FLAGFOOTBALL = 'FB'
    HOCKEY = 'HK'
    SOFTBALL = 'SB'
    BASKETBALL = 'BK'
    CATEGORY_CHOICES = [
        (FLAGFOOTBALL, 'Flag-football'),
        (HOCKEY, 'Hockey'),
        (SOFTBALL, 'Softball'),
        (BASKETBALL, 'Basketball'),
    ]
    category = models.CharField(
        max_length=2,
        choices=CATEGORY_CHOICES,
        default=FLAGFOOTBALL,
    )

    DRAFT = 'DRA'
    SUBMITTED = 'SUB'
    POST = 'PST'
    REJECTED = 'REJ'
    ARCHIVED = 'ARC'
    STATUS_OF_POST = [
        (DRAFT, 'Draft'),
        (SUBMITTED, 'Submitted'),
        (POST, 'Post'),
        (REJECTED, 'Rejected'),
        (ARCHIVED, 'Archived'),
    ]
    status = models.CharField(
        max_length=3,
        choices=STATUS_OF_POST,
        default=DRAFT,
    )  

    def __str__(self):
        return self.name