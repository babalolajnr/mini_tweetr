import factory
from factory.django import DjangoModelFactory
from tweet.models import Tweet
from user.factory import UserFactory


class TweetFactory(DjangoModelFactory):
    class Meta:
        model = Tweet

    user = factory.SubFactory(UserFactory)
