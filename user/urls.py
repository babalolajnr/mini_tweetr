from django.http import HttpResponse
from django.urls import path

from .views import profile, login, save_profile


urlpatterns = [
    path("login/", login, name="login"),
    path('profile', profile, name='profile'),
    path('save_profile', save_profile, name='save_profile'),
]
