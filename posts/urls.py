from django.urls import path
from .views import PostListAPIView, PostDetailAPIView, AuthorPostListAPIView, AdminPostListAPIView


app_name = 'posts'

urlpatterns = [
    path('posts/', PostListAPIView.as_view(), name='article_list'),
    path('posts/<int:pk>/', PostDetailAPIView.as_view(), name='article_detail'),
    path('posts/user/', AuthorPostListAPIView.as_view(), name='user_posts'),
    path('posts/admin/', AdminPostListAPIView.as_view(), name='admin_posts'),
]