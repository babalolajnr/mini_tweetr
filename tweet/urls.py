from django.http import HttpResponse
from django.urls import path

from tweet.views import index, save_tweet


urlpatterns = [
    path('', index, name='home'),
    path('save_tweet', save_tweet, name='save_tweet'),
]
