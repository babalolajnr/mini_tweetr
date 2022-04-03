from django.test import TestCase
from django.urls import reverse

from user.models import User

# Create your tests here.
class TweetTestCase(TestCase):
    def setUp(self) -> None:
        self.user = {"email": "user@gmail.com", "password": "password"}
        User.objects.create_user(**self.user)
        
    def test_index(self):
        self.client.login(**self.user)
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'tweet/home.html')
        # self.assertDictContainsSubset({'tweets': tweets}, response.context)

    def test_tweet_can_be_created(self):
        pass