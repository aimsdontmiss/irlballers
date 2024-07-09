from django.db import models;
from urllib.parse import quote;
from django.utils.translation import gettext_lazy as _



# Create your models here.


def team_logo_path(instance, filename):
    # filename = filename.replace(' ', '_')
    # instance.name = quote(instance.name)
    filename = filename.replace(' ', '_')
    
    return f'teams/{instance.name}/{filename}'


class Record(models.Model):
    team_id = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    slug = models.CharField(max_length=6, blank=True, null=True)
    wins = models.IntegerField()
    losses = models.IntegerField()
    standing = models.IntegerField()
    percent = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    gb = models.IntegerField(blank=True, null=True)
    home_wins = models.IntegerField(blank=True, null=True)
    home_losses = models.IntegerField(blank=True, null=True)
    road_wins = models.IntegerField(blank=True, null=True)
    road_losses = models.IntegerField(blank=True, null=True) 

    def get_slug(self):
        return f"{self.wins}-{self.losses}"
    
    def __str__(self):
        return self.name


class Team(models.Model):
    team_id = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=120)
    CONFERENCE = (
        ('East', 'east'),
        ('West', 'west')
    )
    abbreviation = models.CharField(max_length=50, null=True, blank=True)
    record = models.ForeignKey(Record, on_delete=models.SET_NULL, blank=True, null=True)
    conference = models.CharField(max_length=50, null=True, blank=True, choices=CONFERENCE)
    coach = models.CharField(max_length=120)
    arena = models.CharField(max_length=120)
    city = models.CharField(max_length=120)
    logo = models.ImageField(_("Image"), upload_to=team_logo_path, null=True, blank=True)


    def __str__(self):
        return self.name
    

class PlayoffTeam(models.Model):
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, blank=True, null=True)
    abrv = models.CharField(max_length=6, blank=True, null=True)
    rank = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.abrv


class PlayoffGame(models.Model):
    game_id = models.IntegerField(blank=True, null=True)
    home = models.ForeignKey(PlayoffTeam, on_delete=models.SET_NULL, related_name='home_games', blank=True, null=True)
    away = models.ForeignKey(PlayoffTeam, on_delete=models.SET_NULL, related_name='away_games', blank=True, null=True)
    quarters = models.IntegerField(blank=True, null=True)
    home_pts = models.IntegerField(blank=True, null=True)
    away_pts = models.IntegerField(blank=True, null=True)
    winner = models.IntegerField(blank=True, null=True)
    game_num = models.IntegerField(blank=True, null=True)
    elimination = models.BooleanField(default=False, blank=False, null=True)

    def __str__(self) -> str:
        return f"{self.away} @ {self.home}"


class PlayoffSeries(models.Model):

    class Meta:
        verbose_name_plural = "Playoff Series"

    series_id = models.IntegerField(blank=True, null=True)
    high_seed = models.ForeignKey(PlayoffTeam, on_delete=models.SET_NULL, related_name='high_seed_series', blank=True, null=True)
    low_seed = models.ForeignKey(PlayoffTeam, on_delete=models.SET_NULL, related_name='low_seed_series', blank=True, null=True)
    high_seed_wins = models.IntegerField(blank=True, null=True)
    high_seed_loses = models.IntegerField(blank=True, null=True)
    series_slug = models.CharField(max_length=6, blank=True, null=True)
    # finals = models.BooleanField(blank=True, null=True)
    
    def get_series_slug(self):
        return f"{self.high_seed_wins}-{self.high_seed_loses}"

    def __str__(self):
        return f"{self.high_seed} vs. {self.low_seed}"


class Stat(models.Model):
    player_id = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=120)
    mins = models.DecimalField(max_digits=4, decimal_places=1, blank=True, null=True)
    ppg = models.DecimalField(max_digits=5, decimal_places=1, blank=True, null=True)
    apg = models.DecimalField(max_digits=5, decimal_places=1, blank=True, null=True)
    rpg = models.DecimalField(max_digits=5, decimal_places=1, blank=True, null=True)
    drpg = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    orpg = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    spg = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    bpg = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    ftpg = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    mpg = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    tpg = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    # # Player stats (per-cent)
    ftpc = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    fgpc = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    treypc = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.name


class Player(models.Model):
    player_id = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=120)
    number = models.IntegerField(blank=True, null=True)
    team_name = models.CharField(max_length=120, blank=True, null=True)
    team_id = models.IntegerField(blank=True, null=True)
    position = models.CharField(max_length=30, null=True, blank=True)
    stats = models.ForeignKey(Stat, on_delete=models.SET_NULL, blank=True, null=True)
    # player info
    height = models.CharField(max_length=120, blank=True, null=True)
    weight = models.CharField(max_length=120, blank=True, null=True)
    country = models.CharField(max_length=120, blank=True, null=True)
    school = models.CharField(max_length=120, blank=True, null=True)
    birthdate = models.CharField(max_length=120, blank=True, null=True)
    
    def __str__(self):
        return self.name
    

