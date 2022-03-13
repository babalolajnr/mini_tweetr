from django.shortcuts import redirect, render

from user.forms import LoginForm

# Create your views here.


def login(request):

    if request.user.is_authenticated:
        return redirect("home")

    if request.method == "POST":
        email = request.POST.get("email").lower()
        password = request.POST.get("password")

        try:
            user = User.objects.get(email=email)
        except:
            messages.error(request, "User does not exist")

        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            return redirect("home")
        else:
            messages.error(request, "Username OR password does not exit")

    context = {"page": page}
    return render(request, "base/login_register.html", context)


# def login(request):
#      if request.method == 'POST':
#         form = LoginForm(request.POST)

# if form.is_valid():
# user = request.user

# return HttpResponse(user)
# tweet = Tweet(body=request.POST.get('body'))
# else:
# return HttpResponse('Invalid form')
