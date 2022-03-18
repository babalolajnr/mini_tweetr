from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from tweet.forms import TweetForm
from tweet.models import Tweet

# Create your views here.


@login_required
def index(request):
    tweets = Tweet.objects.filter(user=request.user)
   
    return render(request, "tweet/main.html", {"tweets": tweets})


@login_required
def save_tweet(request):
    if request.method == "POST":
        form = TweetForm(request.POST)

        if form.is_valid():
            user = request.user
            tweet = Tweet(body=form.cleaned_data["body"], user=request.user)
            tweet.save()
            messages.success(request, "Tweet Sent!")
            return redirect(index)
        else:
            return render(
                request, "tweet/main.html", {"errors": form.errors, "form": form}
            )
