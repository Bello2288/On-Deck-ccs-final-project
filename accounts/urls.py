from django.urls import path
from .views import ProfileListAPIView, ProfileDetailAPIView

app_name = 'accounts'

urlpatterns = [
    path('profiles/', ProfileListAPIView.as_view(), name='profiles_list'),
    path('profiles/<int:pk>/', ProfileDetailAPIView.as_view(), name='user_profile'),
]
