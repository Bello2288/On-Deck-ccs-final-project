from django.urls import path, include
app_name = "api_v1"

# urlpatterns = [
#     path('', include('profiles.urls', namespace='profiles')),
# ]

urlpatterns = [
    path('', include('accounts.urls', namespace='accounts')),
    path('', include('posts.urls', namespace='posts')),
]