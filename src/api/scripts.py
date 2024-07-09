# script to fetch and populate player data
import asyncio;
from nba_api.stats.endpoints import playercareerstats, playerindex, teaminfocommon, teamdetails, playerprofilev2, commonplayerinfo, commonplayoffseries, playoffpicture, cumestatsteamgames;
from api.models import *;
from api.schema import RecordMutation, StatMutation;
# from api.tasks import update_all_records;
from asgiref.sync import sync_to_async;
import time;
import pandas as pd;
# Query nba.live.endpoints.scoreboard and  list games in localTimeZone
from datetime import datetime, timezone;
from dateutil import parser;
from nba_api.live.nba.endpoints import scoreboard, boxscore;


# async def update_all_record():
#     teams = await sync_to_async(Team.objects.all)()
#     async for team in teams:
#         record = await sync_to_async(RecordMutation.mutate)(None, None, team_id=team.team_id)
#         print(record)        

# def run_async_function():
#     return asyncio.run(update_all_record())

 
# async def update_all_stat():
#     players = Player.objects.all()
#     async for player in players:
#         stat = await sync_to_async(StatMutation.mutate)(None, None, player_id=player.player_id)
#         print(stat)
            
# def run_async_stat():
#     return asyncio.run(update_all_stat())

# # redis_response = [
# #     "{\"body\": \"W1tdLCB7fSwgeyJjYWxsYmFja3MiOiBudWxsLCAiZXJyYmFja3MiOiBudWxsLCAiY2hhaW4iOiBudWxsLCAiY2hvcmQiOiBudWxsfV0=\", \"content-encoding\": \"utf-8\", \"content-type\": \"application/json\", \"headers\": {\"lang\": \"py\", \"task\": \"api.tasks.update_all_records\", \"id\": \"802a32f9-d93f-4ad3-8175-67951723c896\", \"shadow\": null, \"eta\": null, \"expires\": null, \"group\": null, \"group_index\": null, \"retries\": 0, \"timelimit\": [null, null], \"root_id\": \"802a32f9-d93f-4ad3-8175-67951723c896\", \"parent_id\": null, \"argsrepr\": \"()\", \"kwargsrepr\": \"{}\", \"origin\": \"gen1100@DESKTOP-MQVGO5B\", \"ignore_result\": false, \"replaced_task_nesting\": 0, \"stamped_headers\": null, \"stamps\": {}, \"redelivered\": true}, \"properties\": {\"correlation_id\": \"802a32f9-d93f-4ad3-8175-67951723c896\", \"reply_to\": \"c25ff9e2-632f-319b-b6b0-b8e76c16a1cb\", \"delivery_mode\": 2, \"delivery_info\": {\"exchange\": \"\", \"routing_key\": \"celery\", \"redelivered\": true}, \"priority\": 0, \"body_encoding\": \"base64\", \"delivery_tag\": \"45d503dc-2379-4ee3-80a9-ca365f10a8b3\"}}"
# #     # Include the other JSON strings here
# # ]

# # # Parse each JSON string
# # parsed_tasks = [json.loads(task) for task in redis_response]

# # 0042300174: Clippers vs. Mavericks @ 2024-04-28 15:30:00-04:00
# # 0042300114: Knicks vs. 76ers @ 2024-04-28 13:00:00-04:00
# # 0042300124: Bucks vs. Pacers @ 2024-04-28 19:00:00-04:00
# # 0042300164: Timberwolves vs. Suns @ 2024-04-28 21:30:00-04:00
# # 0042300104: Celtics vs. Heat @ 2024-04-29 19:30:00-04:00
# # 0042300144: Thunder vs. Pelicans @ 2024-04-29 20:30:00-04:00
# # 0042300155: Lakers vs. Nuggets @ 2024-04-29 22:00:00-04:00 
# # 0042300135: Magic vs. Cavaliers @ 2024-04-30 20:00:00-4:00


# # def rank_tie(high, low):
# #     HIGH = high[]


 
# def playoffs():
#     p_o = playoffpicture.PlayoffPicture();

#     po_df = p_o.get_dict()

#     east = po_df['resultSets'][0]
#     west = po_df['resultSets'][1]

#     EAST = east['rowSet']
#     WEST = west['rowSet']
#     WEST[0][5:], WEST[1][5:] = WEST[1][5:], WEST[0][5:] # 7th & 8th switch spots...Lakers get the nod.
#     # print(WEST)

#     EAST = [team[:7] for team in east['rowSet']]
#     WEST = [team[:7] for team in west['rowSet']]


#     EAST_TEAMS = []
#     WEST_TEAMS = []

#     for team in EAST:
#         high_seed = {
#             'conf': team[0],
#             'rank': team[1],
#             'team': team[2],
#             'team id': team[3]
#         }
#         low_seed = {
#             'conf': team[0],
#             'rank': team[4],
#             'team': team[5],
#             'team id': team[6]
#         }
#         MATCHUP = [
#             high_seed, low_seed
#         ]
#         EAST_TEAMS.append(MATCHUP)
#         print(f"{MATCHUP[0]} VS {MATCHUP[1]}")
    
#     for team in WEST:
#         high_seed = {
#             'conf': team[0],
#             'rank': team[1],
#             'team': team[2],
#             'team id': team[3]
#         }
#         low_seed = {
#             'conf': team[0],
#             'rank': team[4],
#             'team': team[5],
#             'team id': team[6]
#         }
#         MATCHUP = [
#             high_seed, low_seed
#         ]
#         WEST_TEAMS.append(MATCHUP)
#         print(f"{MATCHUP[0]} VS {MATCHUP[1]}")
#     return EAST_TEAMS, WEST_TEAMS

 

# def todays_games():
#     f = "{gameId}: {awayTeam} vs. {homeTeam} @ {gameTimeLTZ}" 

#     board = scoreboard.ScoreBoard()
#     print("ScoreBoardDate: " + board.score_board_date)
#     games = board.games.get_dict()
#     for game in games:
#         gameTimeLTZ = parser.parse(game["gameTimeUTC"]).replace(tzinfo=timezone.utc).astimezone(tz=None)
#         print(f.format(gameId=game['gameId'], awayTeam=game['awayTeam']['teamName'], homeTeam=game['homeTeam']['teamName'], gameTimeLTZ=gameTimeLTZ))


# def get_score(game_id):
#     gm = boxscore.BoxScore(game_id=game_id)
#     GM = gm.get_dict()

#     home = GM['game']['homeTeam']
#     away = GM['game']['awayTeam']

#     home_name = home['teamName']
#     away_name = away['teamName']

#     home_score = home['score']
#     away_score = away['score']


#     if home_score > away_score:
#         winner = home_name
#     else:
#         winner = away_name


#     score = {
#         'GAME ID': game_id,
#         'DUB': winner,
#         home_name: home_score,
#         away_name: away_score
#     }
#     return score

# # 1610612760, 1610612743

# def szn_series(high, low):

#     team_stats = cumestatsteamgames.CumeStatsTeamGames(team_id=high, vs_team_id_nullable=low)

#     series = team_stats.get_dict()

#     szn_games = series['resultSets'][0]['rowSet']

#     for game in szn_games:
#         score = get_score(game[1])
#         print(score)



# def post_szn(game, round):
#     post = commonplayoffseries.CommonPlayoffSeries()
#     p = post.get_dict()
#     line = p['resultSets'][0]['rowSet']

#     GAME = game + 1
#     ROUND = round +1

#     games = []

#     for i in line:
#         if int(i[0][-1]) < GAME and int(i[0][-3]) < ROUND:
#             score = get_score(i[0])
#             games += [score]
#             print(score)

#     return games

def bio(player_id):
    try:
        player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
        player_data = player_info.get_dict()

        common_info = player_data['resultSets'][0]['rowSet'][0]
        headers = player_data['resultSets'][0]['headers']

        required_fields = ["DISPLAY_FIRST_LAST", "BIRTHDATE", "SCHOOL", "COUNTRY",
                        "HEIGHT", "WEIGHT", "SEASON_EXP", "JERSEY", "POSITION", "ROSTERSTATUS"]
        
        # Extract the required fields into a dictionary
        extracted_info = {field: common_info[headers.index(field)] for field in required_fields}
    
        return extracted_info
    
    except IndexError:
        return None



# async def update_player():
#     players = await sync_to_async(Player.objects.all)()

#     for player in players:
#         BIO = await sync_to_async(bio)(player.player_id)
#         if BIO is not None:
#             player.birthdate = BIO["BIRTHDATE"]
#             player.height = BIO["HEIGHT"]
#             player.weight = BIO["WEIGHT"]
#             player.country = BIO["COUNTRY"]
#             player.school = BIO["SCHOOL"]
#             await sync_to_async(player.save)()  # Ensure this is called correctly
#             print(player)
#         else:
#             print(f"No data found for player_id {player.player_id}")


async def update_player():
    players = await sync_to_async(list)(Player.objects.all())

    for player in players:
        bio_info = await sync_to_async(bio)(player.player_id)
        if bio_info is not None:


            player.birthdate = bio_info["BIRTHDATE"]
            player.height = bio_info["HEIGHT"]
            player.weight = bio_info["WEIGHT"]
            player.country = bio_info["COUNTRY"]
            player.school = bio_info["SCHOOL"]

            await sync_to_async(player.save)()  # Ensure this is called correctly
            print(player)
        else:
            print(f"No data found for player_id {player.player_id}")


# Wrapper to run the update_player async function
def run_async_player():
    asyncio.run(update_player())


# def run_async_player():
#     asyncio.run(update_player())
# run_async_player()

