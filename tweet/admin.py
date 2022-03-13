from django.contrib import admin
from user.models import User
from django.contrib.auth.admin import UserAdmin

from tweet.models import Retweet, Tweet

# Register your models here.
admin.site.register(Tweet)
admin.site.register(Retweet)
admin.site.register(User, UserAdmin)