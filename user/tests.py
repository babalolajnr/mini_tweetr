from django.test import TestCase
from django.urls import reverse

from user.models import User

# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self) -> None:
        self.user = {"email": "user@gmail.com", "password": "password"}
        User.objects.create_user(**self.user)

    def test_user_profile(self):
        self.client.login(**self.user)
        response = self.client.get(reverse("profile"), self.user)
        self.assertEqual(response.status_code, 200)

    def test_user_login(self):
        response = self.client.post(reverse("login"), self.user)
        self.assertEqual(response.status_code, 302)