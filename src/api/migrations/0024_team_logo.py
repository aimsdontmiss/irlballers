# Generated by Django 5.0.2 on 2024-07-02 17:09

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_remove_playoffseries_finals'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to=api.models.team_logo_path, verbose_name='Image'),
        ),
    ]
