import factory
from factory.django import DjangoModelFactory
from tweet.models import Tweet


class TweetFactory(DjangoModelFactory):
    class Meta:
        model = Tweet

    
