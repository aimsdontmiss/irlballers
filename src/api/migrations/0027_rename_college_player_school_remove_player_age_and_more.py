# Generated by Django 5.0.2 on 2024-07-07 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_rename_school_player_college_player_age_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='player',
            old_name='college',
            new_name='school',
        ),
        migrations.RemoveField(
            model_name='player',
            name='age',
        ),
        migrations.RemoveField(
            model_name='player',
            name='display_name',
        ),
        migrations.AlterField(
            model_name='player',
            name='weight',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]
