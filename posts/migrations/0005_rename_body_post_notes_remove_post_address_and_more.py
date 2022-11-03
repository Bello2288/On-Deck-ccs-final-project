# Generated by Django 4.1.2 on 2022-11-02 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_alter_post_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='body',
            new_name='notes',
        ),
        migrations.RemoveField(
            model_name='post',
            name='address',
        ),
        migrations.RemoveField(
            model_name='post',
            name='address_json',
        ),
        migrations.RemoveField(
            model_name='post',
            name='title',
        ),
        migrations.AddField(
            model_name='post',
            name='location',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='organization',
            field=models.CharField(max_length=225, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='teamname',
            field=models.CharField(max_length=225, null=True),
        ),
    ]