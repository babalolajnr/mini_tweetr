from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib import auth
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

from tweet.models import Tweet

from .forms import LoginForm
from .models import User
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
    # return HttpResponse(count_tweets)

    return render(request, "user/profile.html", {tweets: tweets, count_tweets: count_tweets})
