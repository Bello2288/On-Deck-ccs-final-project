# Generated by Django 4.1.2 on 2022-11-04 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0005_rename_body_post_notes_remove_post_address_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='title',
            field=models.CharField(max_length=225, null=True),
        ),
    ]