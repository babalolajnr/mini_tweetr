import email
from django import forms

class LoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField()

class ProfileForm(forms.Form):
    first_name = forms.CharField(max_length=25)
    last_name = forms.CharField(max_length=25)
    bio = forms.CharField(max_length=160, required=False)
    location = forms.CharField(max_length=160, required=False)
    website = forms.CharField(max_length=100, required=False)