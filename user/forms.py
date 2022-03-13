import email
from django import forms

class LoginForm(forms.Forms):
    email = forms.EmailField()
    password = forms.CharField()