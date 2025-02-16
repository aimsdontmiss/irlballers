# Generated by Django 5.0.2 on 2024-04-28 01:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_alter_stat_apg_alter_stat_mins_alter_stat_ppg_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlayoffGame',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game_id', models.IntegerField(blank=True, null=True)),
                ('quarters', models.IntegerField(blank=True, null=True)),
                ('home_pts', models.IntegerField(blank=True, null=True)),
                ('away_pts', models.IntegerField(blank=True, null=True)),
                ('winner', models.IntegerField(blank=True, null=True)),
                ('away', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='away_games', to='api.team')),
                ('home', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='home_games', to='api.team')),
            ],
        ),
        migrations.CreateModel(
            name='PlayoffSeries',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('series_id', models.IntegerField(blank=True, null=True)),
                ('high_seed_wins', models.IntegerField(blank=True, null=True)),
                ('high_seed_loses', models.IntegerField(blank=True, null=True)),
                ('series_slug', models.CharField(blank=True, max_length=6, null=True)),
                ('high_seed', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='high_seed_series', to='api.team')),
                ('low_seed', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='low_seed_series', to='api.team')),
            ],
        ),
    ]
