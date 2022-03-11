from django.http import HttpResponse
from django.urls import path

from tweet.views import index, save_tweet


def greet(request):
    return HttpResponse('Hello Boss man')


urlpatterns = [
    path('hello/', greet),
    path('', index),
    path('save_tweet', save_tweet, name='save_tweet'),
]
