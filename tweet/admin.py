from django.contrib import admin

from tweet.models import Retweet, Tweet

# Register your models here.
admin.site.register(Tweet)
admin.site.register(Retweet)