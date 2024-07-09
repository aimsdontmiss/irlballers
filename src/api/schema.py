import graphene;
from decimal import Decimal;
from graphene_django.types import DjangoObjectType;
from .models import *;
from nba_api.stats.endpoints import teaminfocommon, commonplayerinfo;


# Define an Enum for sorting fields
class StatOrderField(graphene.Enum):
    PLAYER_ID = 'player_id'
    NAME = 'name'
    PPG = 'ppg'
    APG = 'apg'
    RPG = 'rpg'

# Define an Enum for sorting order
class SortOrder(graphene.Enum):
    ASC = 'asc'
    DESC = 'desc'


class TeamType(DjangoObjectType):
    class Meta:
        model = Team

class PlayerType(DjangoObjectType):
    class Meta:
        model = Player

class RecordType(DjangoObjectType):
    class Meta:
        model = Record

class StatType(DjangoObjectType):
    class Meta:
        model = Stat

# Define query fields to fetch data

class Query(graphene.ObjectType):

    # Query to get list of all ObjectTypes
    all_teams = graphene.List(TeamType)
    all_players = graphene.List(PlayerType)
    all_records = graphene.List(RecordType)

    # all_stats = graphene.List(
    #     StatType, 
    #     order_by = graphene.Argument(StatOrderField, default_value=StatOrderField.PPG), 
    #     order=graphene.Argument(SortOrder, default_value=SortOrder.DESC)
    # )

    all_stats = graphene.List(
        StatType, 
        order_by = graphene.Argument(StatOrderField, default_value=StatOrderField.PPG), 
        order = graphene.Argument(SortOrder, default_value=SortOrder.DESC),
        first = graphene.Int(),
        skip = graphene.Int()
    )

    # Query to get single object of ObjectType
    obj_team = graphene.Field(TeamType, team_id=graphene.Int())
    obj_player = graphene.Field(PlayerType, player_id=graphene.Int())
    obj_record = graphene.Field(RecordType, team_id=graphene.Int())
    obj_stat = graphene.Field(StatType, player_id=graphene.Int())

    # Resolver function to retrieve all ObjectTypes
    def resolve_all_teams(self, info):
        return Team.objects.all()

    def resolve_all_players(self, info):
        return Player.objects.all()
    
    def resolve_all_records(self, info):
        return Record.objects.all()
    
    # def resolve_all_stats(self, info, order_by, order):
    #     sort_field = order_by.value
    #     sort_param = sort_field if order == SortOrder.ASC else f"-{sort_field}"
    #     return Stat.objects.all().order_by(sort_param)

    def resolve_all_stats(self, info, order_by, order, first=None, skip=None):
        sort_field = order_by.value
        sort_param = sort_field if order == SortOrder.ASC else f"-{sort_field}"
        queryset = Stat.objects.all().order_by(sort_param)
        if skip is not None:
            queryset = queryset[skip:]
        if first is not None:
            queryset = queryset[:first]
        return queryset

    # Resolver function to retrieve single ObjectType
    def resolve_obj_team(self, info, team_id):
        return Team.objects.get(team_id=team_id)
    
    def resolve_obj_player(self, info, player_id):
        return Player.objects.get(player_id=player_id) 
    
    def resolve_obj_record(self, info, team_id):
        return Record.objects.get(team_id=team_id) 
    
    def resolve_obj_stat(self, info, player_id):
        return Stat.objects.get(player_id=player_id) 
    

# Define mutations to create/update/delete data if needed
class RecordMutation(graphene.Mutation):

    class Arguments:
        team_id = graphene.ID()

    record = graphene.Field(RecordType)

    @classmethod
    def mutate(cls, root, info, team_id):
        try:
            team_data = teaminfocommon.TeamInfoCommon(team_id=team_id).get_normalized_dict() 
            DATA = team_data['TeamInfoCommon'][0]

            record = Record.objects.get(team_id=team_id)

            record.wins = DATA['W']
            record.losses = DATA['L']
            record.percent = str(round(DATA['PCT'], 2))
            record.standing = DATA['CONF_RANK']
            record.save()
            record.slug = record.get_slug()
            record.save()
            
            return RecordMutation(record=record)
        except Exception as e:
            # Log the error or handle it in any other appropriate way
            print(f"An error occurred: {str(e)}")
            # Return an appropriate error response
            return RecordMutation(record=None) 
    

class StatMutation(graphene.Mutation):
    
    class Arguments:
        player_id = graphene.ID()

    stat = graphene.Field(StatType)

    @classmethod
    def mutate(cls, root, info, player_id):
        try:
            player_data = commonplayerinfo.CommonPlayerInfo(player_id=player_id).get_normalized_dict()
            DATA = player_data['PlayerHeadlineStats'][0]

            stat = Stat.objects.get(player_id=player_id)

            stat.ppg = Decimal(DATA['PTS'])
            stat.apg = Decimal(DATA['AST'])
            stat.rpg = Decimal(DATA['REB'])
            stat.save()
            
            return StatMutation(stat=stat)
        except Exception as e:
            # Log the error or handle it in any other appropriate way
            print(f"An error occurred: {str(e)}")
            # Return an appropriate error response
            return StatMutation(stat=None) 


class PlayerMutation(graphene.Mutation):
    
    class Arguments:
        player_id = graphene.ID()

    player = graphene.Field(PlayerType)

    @classmethod
    def mutate(cls, root, info, player_id):
        try:
            player_data = commonplayerinfo.CommonPlayerInfo(player_id=player_id).get_normalized_dict()
            DATA = player_data['PlayerHeadlineStats'][0]

            player = Player.objects.get(player_id=player_id)

            player.ppg = Decimal(DATA['PTS'])
            stat.apg = Decimal(DATA['AST'])
            stat.rpg = Decimal(DATA['REB'])
            stat.save()
            
            return StatMutation(stat=stat)
        except Exception as e:
            # Log the error or handle it in any other appropriate way
            print(f"An error occurred: {str(e)}")
            # Return an appropriate error response
            return StatMutation(stat=None) 


class Mutation(graphene.ObjectType):

    update_record = RecordMutation.Field()
    update_stat = StatMutation.Field()


# Create schema
schema = graphene.Schema(query=Query, mutation=Mutation)


