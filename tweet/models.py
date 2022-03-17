from django.db import models

from user.models import User

# Create your models here.


class Thread(models.Model):
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

# if the thread column is empty on a row then the tweet is not a thread
class Tweet(models.Model):
    body = models.TextField(max_length=280)
    user = models.ForeignKey(User, related_name='tweets',
                             on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    thread = models.ForeignKey(Thread, related_name="tweets", on_delete=models.CASCADE, null=True, blank=True)
    thread_number = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.body


class Retweet(models.Model):
    tweet = models.ForeignKey(
        Tweet, related_name='retweets', on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey(
        User, related_name='retweets', on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
