from django.db import models
from django.conf import settings

class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    teamname = models.CharField(max_length=225, null=True)
    organization = models.CharField(max_length=225, null=True)
    location = models.CharField(max_length=255, null=True)
    title = models.CharField(max_length=225, null=True)
    date = models.DateField()
    time = models.TimeField()
    notes = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    is_highlighted = models.BooleanField(default=False)
    reserved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name="post_reserver")
    # reserved_by_username = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name="post_reserver_username")


    FLAGFOOTBALL = 'Flag-football'
    HOCKEY = 'Hockey'
    SOFTBALL = 'Softball'
    BASKETBALL = 'Basketball'
    CATEGORY_CHOICES = [
        (FLAGFOOTBALL, 'Flag-football'),
        (HOCKEY, 'Hockey'),
        (SOFTBALL, 'Softball'),
        (BASKETBALL, 'Basketball'),
    ]
    category = models.CharField(
        max_length=13,
        choices=CATEGORY_CHOICES,
        default=FLAGFOOTBALL,
    )

    ACMY_OF_GREENVILLE = 'ACMY of Greenville'
    ABC_SPORTS_CENTER = 'ABC Sports Center'
    ORGANIZATION_CHOICES = [
        (ACMY_OF_GREENVILLE, 'ACMY of Greenville'),
        (ABC_SPORTS_CENTER, 'ABC Sports Center'),
    ]
    organization = models.CharField(
        max_length=18,
        choices=ORGANIZATION_CHOICES,
        default=ACMY_OF_GREENVILLE,
    )

    NORTHWEST_PARK = 'Northwest Park'
    GARY_PARK = 'Gary L. Pittman Park'
    PAVILION_COMPLEX = 'Pavilion Recreation Complex'
    GOWER_PARK = 'Gower Park'
    STEVENS_FIELD = 'Stevens Field'
    LAKESIDE_PARK= 'Lakeside Park'
    ABC_SPORTS_CENTER = 'ABC Sports Center'
    NORTHSIDE_PARK = 'Northside Park'
    LOCATION_CHOICES = [
        (NORTHWEST_PARK, 'Northwest Park'),
        (GARY_PARK, 'Gary L. Pittman Park'),
        (PAVILION_COMPLEX, 'Pavilion Recreation Complex'),
        (GOWER_PARK, 'Gower Park'),
        (STEVENS_FIELD, 'Stevens Field'),
        (LAKESIDE_PARK, 'Lakeside Park'),
        (ABC_SPORTS_CENTER, 'ABC Sports Center'),
        (NORTHSIDE_PARK, 'Northside Park'),
    ]
    location = models.CharField(
        max_length=28,
        choices=LOCATION_CHOICES,
        default=NORTHWEST_PARK,
    )

    DRAFT = 'DRA'
    SUBMITTED = 'SUB'
    POST = 'PST'
    TAKESPOT = 'TKS'
    REJECTED = 'REJ'
    ARCHIVED = 'ARC'
    STATUS_OF_POST = [
        (DRAFT, 'Draft'),
        (SUBMITTED, 'Submitted'),
        (POST, 'Post'),
        (TAKESPOT, 'Take Spot'),
        (REJECTED, 'Rejected'),
        (ARCHIVED, 'Archived'),
    ]
    status = models.CharField(
        max_length=3,
        choices=STATUS_OF_POST,
        default=DRAFT,
    )  

    def __str__(self):
        return self.title