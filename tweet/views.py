from django.contrib import messages
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from tweet.forms import TweetForm
from tweet.models import Retweet, Tweet

# Create your views here.


@login_required
def index(request):
    tweets = Tweet.objects.filter(user=request.user)
    liked_tweets = request.user.liked_tweets.all()
    retweets = request.user.retweets.all()

    # Get the tweet objects of the user's retweets
    retweeted_tweets = []

    for retweet in retweets:
        tweet = retweet.tweet
        retweeted_tweets.append(tweet)

    return render(
        request,
        "tweet/home.html",
        {
            "tweets": tweets,
            "liked_tweets": liked_tweets,
            "retweeted_tweets": retweeted_tweets,
        },
    )


@login_required
def save_tweet(request):
    if request.method == "POST":
        form = TweetForm(request.POST)

        if form.is_valid():
            tweet = Tweet(body=form.cleaned_data["body"], user=request.user)
            tweet.save()
            messages.success(request, "Tweet Sent!")
            return redirect(index)
        else:
            return render(
                request, "tweet/home.html", {"errors": form.errors, "form": form}
            )


@login_required
def like_tweet(request, tweet_id):
    tweet = Tweet.objects.get(pk=tweet_id)
    tweet.likes.add(request.user)
    return JsonResponse({"message": "success"})


@login_required
def unlike_tweet(request, tweet_id):
    tweet = Tweet.objects.get(pk=tweet_id)
    tweet.likes.remove(request.user)
    return JsonResponse({"message": "success"})


@login_required
def retweet(request, tweet_id):
    tweet = Tweet.objects.get(pk=tweet_id)

    # check if the user has already retweeted the tweet
    check = Retweet.objects.filter(tweet=tweet, user=request.user).exists()
    if check:
        return HttpResponseForbidden("You can only retweet once!")

    retweet = Retweet(tweet=tweet, user=request.user)
    retweet.save()

    return JsonResponse({"message": "success"})


@login_required
def unretweet(request, tweet_id):
    tweet = Tweet.objects.get(pk=tweet_id)
    retweet = Retweet.objects.get(tweet=tweet, user=request.user)
    retweet.delete()
    return JsonResponse({"message": "success"})


@login_required
def reply(request, tweet_id):
    if request.method == "POST":
        form = TweetForm(request.POST)
        if form.is_valid():
            tweet = Tweet(
                body=form.cleaned_data["body"], user=request.user, reply_parent=tweet_id
            )
            tweet.save()
            return JsonResponse({"message": "Replied"})

        else:
            return JsonResponse(
                {"message": "failed", "errors": form.errors, "form": form}, status=400
            )
