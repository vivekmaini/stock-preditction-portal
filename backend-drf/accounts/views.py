from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from . serializers import accountserializer
from rest_framework.permissions import AllowAny


class Registerview(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=accountserializer
    permission_classes=[AllowAny]

