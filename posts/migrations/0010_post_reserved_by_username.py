# Generated by Django 4.1.3 on 2022-11-09 23:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0009_alter_post_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='reserved_by_username',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='post_reserver_username', to=settings.AUTH_USER_MODEL),
        ),
    ]
