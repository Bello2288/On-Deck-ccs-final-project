from django.urls import path
from .views import ProfileListAPIView
# from .views import UserProfileListAPIView, TeamOrganizerProfileListAPIView

app_name = 'accounts'

urlpatterns = [
    path('profiles/', ProfileListAPIView.as_view(), name='profiles_list'),
    # path('profiles/', UserProfileListAPIView.as_view(), name='profiles_list'),
    # path('teamprofiles/', TeamOrganizerProfileListAPIView.as_view(), name='teamprofiles_list'),
]
