# from django.test import TestCase
# import pandas as pd;
# from nba_api.stats.endpoints import leaguestandings;
# import re;
# # Create your tests here.


# standings = leaguestandings.LeagueStandings()


# league_frames = standings.get_data_frames()
# league_df = league_frames[0]
# league = pd.DataFrame(league_df)

# team = league.loc[22]
# record = team['Record']
# confer = team['Conference']
# city = team['TeamCity']
# name = team['TeamName']

# print(record, confer, city, name)

# Query nba.live.endpoints.scoreboard and  list games in localTimeZone
from datetime import datetime, timezone;
from dateutil import parser;
from nba_api.live.nba.endpoints import scoreboard;


def post_szn():

    f = "{gameId}: {awayTeam} vs. {homeTeam} @ {gameTimeLTZ}" 

    board = scoreboard.ScoreBoard()
    print("ScoreBoardDate: " + board.score_board_date)
    games = board.games.get_dict()
    for game in games:
        gameTimeLTZ = parser.parse(game["gameTimeUTC"]).replace(tzinfo=timezone.utc).astimezone(tz=None)
        print(f.format(gameId=game['gameId'], awayTeam=game['awayTeam']['teamName'], homeTeam=game['homeTeam']['teamName'], gameTimeLTZ=gameTimeLTZ))
