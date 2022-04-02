from django.db import models

from user.models import User

# Create your models here.


class Thread(models.Model):
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)


# if the thread column is empty on a row then the tweet is not a thread
class Tweet(models.Model):
    """
    Note:
    * There are three types of tweets: Tweet, Reply, and Retweet
    * The body field can be null because the tweet can be a retweet of another tweet.
    * The reply_parent field is used to determine if the tweet is a reply to another tweet
    and also to know if a tweet is a tweet or a reply to a tweet.
    * The retweet_parent field is used to determine if the tweet is a retweet of another
    tweet.
    * The thread field is used to determine if the tweet is a thread. It links to a thread
    in the table.
    * The thread_rank field is used to determine the rank of the tweet in the thread.

    Tweet Rules:
    1. A tweet must have a body.
    2. A must have a related user.
    3. A tweet does not have a reply_parent.
    4. A tweet does not have a retweet_parent.
    5. A tweet may or may not have a thread.
    6. A tweet must have a thread_rank if the thread field is not empty.

    Reply Rules:
    1. A reply must have a body.
    2. A reply must have a related user.
    3. A reply must have a reply_parent. A reply_parent signifies what the tweet
    is a reply to.
    4. A reply does not have a retweet_parent.
    5. A reply does not have a thread or thread_rank.

    Retweet Rules:
    1. A retweet does not have a body.
    2. A retweet must have a related user.
    3. A retweet must have a retweet_parent. A retweet_parent signifies what the tweet
    is a retweet of.
    4. A retweet does not have a reply_parent.
    5. A retweet does not have a thread or thread_rank.
    """

    body = models.TextField(max_length=280, blank=True, null=True)
    user = models.ForeignKey(User, related_name="tweets", on_delete=models.CASCADE)
    reply_parent = models.ForeignKey(
        "self", null=True, blank=True, related_name="replies", on_delete=models.CASCADE
    )
    retweet_parent = models.ForeignKey(
        "self", null=True, blank=True, related_name="retweets", on_delete=models.CASCADE
    )
    thread = models.ForeignKey(
        Thread, related_name="tweets", on_delete=models.CASCADE, null=True, blank=True
    )
    thread_rank = models.IntegerField(null=True, blank=True)
    likes = models.ManyToManyField(User, related_name="liked_tweets")
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return self.body
