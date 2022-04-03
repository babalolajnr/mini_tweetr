from django.http import HttpResponse
from django.urls import path

from tweet.views import index, like_tweet, save_tweet, unlike_tweet


urlpatterns = [
    path('', index, name='home'),
    path('save_tweet', save_tweet, name='save_tweet'),
    path('like_tweet/<int:tweet_id>/', like_tweet, name='like_tweet'),
    path('unlike_tweet/<int:tweet_id>/', unlike_tweet, name='unlike_tweet'),
]
