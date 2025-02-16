from django.urls import path;
from .views import *;
from graphene_django.views import GraphQLView;
from django.views.decorators.csrf import csrf_exempt;
from django.conf import settings;
from django.conf.urls.static import static;


urlpatterns = [

    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)