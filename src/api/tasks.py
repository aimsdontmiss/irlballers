import asyncio;
from .models import Team, Player
from .schema import RecordMutation, StatMutation;
from irlballers.celery import app;
from asgiref.sync import sync_to_async;


async def update_all_record():
    teams = await sync_to_async(Team.objects.all)()
    async for team in teams:
        record = await sync_to_async(RecordMutation.mutate)(None, None, team_id=team.team_id)
        print(record)


@app.task()
def update_all_records():
    return asyncio.run(update_all_record())


async def update_all_stat():
    players = Player.objects.all()
    async for player in players:
        stat = await sync_to_async(StatMutation.mutate)(None, None, player_id=player.player_id)
        print(stat)

@app.task            
def update_all_stats():
    return asyncio.run(update_all_stat())