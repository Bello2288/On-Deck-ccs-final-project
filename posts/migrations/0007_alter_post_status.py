# Generated by Django 4.1.3 on 2022-11-08 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_post_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='status',
            field=models.CharField(choices=[('DRA', 'Draft'), ('SUB', 'Submitted'), ('PST', 'Post'), ('TKS', 'Take Spot'), ('REJ', 'Rejected'), ('ARC', 'Archived')], default='DRA', max_length=3),
        ),
    ]
