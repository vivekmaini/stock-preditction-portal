from django.urls import path
from accounts import views as Userview



urlpatterns=[
    path('register/',Userview.Registerview.as_view()),
]