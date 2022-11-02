from django.urls import path
from .views import PostListAPIView, PostDetailAPIView, AuthorPostListAPIView, AdminPostListAPIView


app_name = 'posts'

urlpatterns = [
    path('posts/', PostListAPIView.as_view(), name='posts_list'),
    path('posts/<int:pk>/', PostDetailAPIView.as_view(), name='posts_detail'),
    path('posts/user/', AuthorPostListAPIView.as_view(), name='user_posts'),
    path('articles/admin/', AdminPostListAPIView.as_view(), name='admin_articles'),
]