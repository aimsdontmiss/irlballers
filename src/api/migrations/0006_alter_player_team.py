# Generated by Django 5.0.2 on 2024-03-17 23:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_player_team'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='team',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]
