from django.db import models
from django.conf import settings

class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    title = models.CharField(max_length=225)
    body = models.TextField()
    address = models.CharField(max_length=255)
    address_json = models.JSONField(null=True)
    date = models.DateField()
    time = models.TimeField()
    body = models.TextField()
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
    CREATE = 'CRE'
    SUBMITTED = 'SUB'
    STATUS_OF_ARTICLE = [
        (DRAFT, 'Draft'),
        (CREATE, 'Create'),
        (SUBMITTED, 'Submitted'),
    ]
    status = models.CharField(
        max_length=3,
        choices=STATUS_OF_ARTICLE,
        default=DRAFT,
    )   

    def __str__(self):
        return self.name