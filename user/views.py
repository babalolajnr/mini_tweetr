from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib import auth
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

from tweet.models import Tweet

from .forms import LoginForm, ProfileForm
from .models import Profile, User
from django.contrib.auth.decorators import login_required


def login(request):
    if request.user.is_authenticated:
        return redirect("home")

    if request.method == "POST":
        form = LoginForm(request.POST)

        if form.is_valid():

            email = form.cleaned_data["email"].lower()
            password = form.cleaned_data["password"]

            user = authenticate(request, email=email, password=password)

            if user is not None:
                auth.login(request, user)
                return redirect("home")
            else:
                messages.error(request, "Email/password is invalid")

        return render(request, "user/login.html", {"errors": form.errors})

    return render(request, "user/login.html")


@login_required
def profile(request):
    user = request.user
    tweets = Tweet.objects.filter(user=user)
    count_tweets = tweets.count()
    liked_tweets = user.liked_tweets.all()
    retweets = request.user.retweets.all()

    # Get the tweet objects of the user's retweets
    retweeted_tweets = []

    for retweet in retweets:
        tweet = retweet.tweet
        retweeted_tweets.append(tweet)

    try:
        profile = Profile.objects.get(user=user)
    except Profile.DoesNotExist:
        profile = None

    return render(
        request,
        "user/profile.html",
        {
            "tweets": tweets,
            "count_tweets": count_tweets,
            "profile": profile,
            "liked_tweets": liked_tweets,
            "retweeted_tweets": retweeted_tweets,
        },
    )


@login_required
def save_profile(request):

    if request.method != "POST":
        return render(request, "user/profile.html")

    form = ProfileForm(request.POST)

    if not form.is_valid():
        return render(request, "user/profile.html", {"errors": form.errors})

    first_name = form.cleaned_data["first_name"]
    last_name = form.cleaned_data["last_name"]
    bio = form.cleaned_data["bio"]
    website = form.cleaned_data["website"]
    location = form.cleaned_data["location"]

    user = request.user
    user.first_name = first_name
    user.last_name = last_name
    user.save()

    try:
        profile = Profile.objects.get(pk=user.id)
    except Profile.DoesNotExist:
        profile = Profile(user=user)

    profile.bio = bio
    profile.website = website
    profile.location = location
    profile.save()

    messages.success(request, "User details updated")
    return render(request, "user/profile.html")
