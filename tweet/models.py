from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Tweet(models.Model):
    body = models.TextField(max_length=280)
    user = models.ForeignKey(User, related_name='tweets',
                             on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return self.body


class Retweet(models.Model):
    tweet = models.ForeignKey(
        Tweet, related_name='retweets', on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(
        User, related_name='retweets', on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)


