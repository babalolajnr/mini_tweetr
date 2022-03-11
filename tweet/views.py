from django.http import HttpResponse
from django.shortcuts import render

from tweet.forms import TweetForm

# Create your views here.


def index(request):
    return render(request, 'tweet/main.html')


def save_tweet(request):
    if request.method == 'POST':
        form = TweetForm(request.POST)

        if form.is_valid():
            return HttpResponse(request.body)
