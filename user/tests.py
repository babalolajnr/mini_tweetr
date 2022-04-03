from django.test import TestCase
from django.urls import reverse
from faker import Faker
from user.factory import UserFactory

from user.models import User

# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self) -> None:
        self.user = {"email": "user@gmail.com", "password": "password"}
        self.faker = Faker()
        User.objects.create_user(**self.user)

    def test_user_can_get_profile_view(self):
        self.client.login(**self.user)
        response = self.client.get(reverse("profile"), self.user)
        self.assertEqual(response.status_code, 200)

    def test_user_can_login(self):
        response = self.client.post(reverse("login"), self.user)
        self.assertEqual(response.status_code, 302)

    def test_user_can_save_profile(self):
        self.client.login(**self.user)
        response = self.client.post(
            reverse("save_profile"),
            {
                "bio": self.faker.text(),
                "location": self.faker.city(),
            },
        )
        self.assertEqual(response.status_code, 200)
