# Generated by Django 5.0.2 on 2024-04-28 05:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_rename_playoffseries_playoffserie'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PlayoffSerie',
            new_name='PlayoffSeries',
        ),
        migrations.AlterModelOptions(
            name='playoffseries',
            options={'verbose_name_plural': 'Playoff Series'},
        ),
    ]
