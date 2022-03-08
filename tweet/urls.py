from django.http import HttpResponse
from django.urls import path

from tweet.views import index


def greet(request):
    return HttpResponse('Hello Boss man')


urlpatterns = [
    path('hello/', greet),
    path('', index)
]
