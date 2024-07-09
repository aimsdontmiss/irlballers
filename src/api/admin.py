from django.contrib import admin;
from .models import *;

# Register your models here.

admin.site.register(Team)
admin.site.register(Player)
admin.site.register(Record)
admin.site.register(Stat)
admin.site.register(PlayoffGame)
admin.site.register(PlayoffSeries)
admin.site.register(PlayoffTeam)