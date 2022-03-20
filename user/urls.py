from django.http import HttpResponse
from django.urls import path

from .views import profile, login


urlpatterns = [
    path("login/", login, name="login"),
    path('profile', profile, name='profile'),
]
