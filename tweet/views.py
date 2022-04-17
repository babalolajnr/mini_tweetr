from django.contrib import messages
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from tweet.forms import TweetForm
from tweet.models import Tweet

# Create your views here.


@login_required
def index(request):
    tweets = Tweet.objects.filter(retweet_parent_id__isnull=True).filter(
        user=request.user
    )
    liked_tweets = request.user.liked_tweets.all()
    retweets = Tweet.objects.filter(retweet_parent_id__isnull=False)
    retweet_counts = {}
    for tweet in tweets:
        retweet_count = tweet.retweets.count()
        retweet_counts[tweet.id] = retweet_count

    return render(
        request,
        "tweet/home.html",
        {
            "tweets": tweets,
            "liked_tweets": liked_tweets,
            "retweets": retweets,
            "retweet_counts": retweet_counts,
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
    return JsonResponse({"message": "Tweet liked!"})


@login_required
def unlike_tweet(request, tweet_id):
    tweet = Tweet.objects.get(pk=tweet_id)
    tweet.likes.remove(request.user)
    return JsonResponse({"message": "Tweet unliked!"})


@login_required
def retweet(request, tweet_id):
    tweet = Tweet.objects.get(pk=tweet_id)
    retweet = (
        Tweet.objects.filter(retweet_parent_id=tweet.id)
        .filter(user=request.user)
        .count()
    )
    if retweet == 0:
        retweet = Tweet(
            user=request.user,
            retweet_parent_id=tweet.id,
        )
        retweet.save()
        return JsonResponse({"message": "Retweeted!"})
    else:
        return HttpResponseForbidden("You can only retweet once!")
