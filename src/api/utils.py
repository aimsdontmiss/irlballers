import pandas as pd;
from nba_api.stats.endpoints import leaguestandings;
from nba_api.stats.endpoints import Scoreboard;
# Create your tests here.
    

standings = leaguestandings.LeagueStandings()

# scoreboard = Scoreboard.DataSet()
# print(scoreboard)


league_frames = standings.get_data_frames()
league_df = league_frames[0]
league = pd.DataFrame(league_df)

east = []
west = []

for i in range(0,30):
    team = league.loc[i]
    TEAM = {'team': team['TeamName'], 'Ws': team['WINS'], 'Ls': team['LOSSES']}
    if team['Conference'] == 'East':
        east += [TEAM]
    else:
        west += [TEAM]


CONF = west

def standings(conf):
    spot = 1
    for q in CONF:
        print(spot, ':', q)
        if spot == 8:
            print('<---------- PLAYOFF PICTURE ------------->')
        if spot == 12:
            print('<----------- PLAYIN PICTURE ------------>')
        spot += 1

standings(CONF)
print(east)
