from django.db import models
from django.contrib.auth.models import AbstractUser

from django.contrib.auth.base_user import BaseUserManager

# Create your models here.

class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    email = models.EmailField('email address', unique=True)
    avatar = models.ImageField(default='avatar.png')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Profile(models.Model):
    header_photo = models.ImageField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    location = models.TextField(null=True, blank=True)
    website = models.TextField(null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE, unique=True)

    def __str__(self):
        return self.user.username
