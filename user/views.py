from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib import auth
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages


from .forms import LoginForm
from .models import User

# Create your views here.


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

def profile(request):
    pass