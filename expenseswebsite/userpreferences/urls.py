from . import views
from django.urls import path
app_name = 'userpreferences'
urlpatterns = [
    path('', views.index, name="preferences")
]