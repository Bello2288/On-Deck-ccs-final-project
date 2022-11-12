from django.urls import path
from .views import PostListAPIView, PostDetailAPIView, AuthorPostListAPIView, AdminPostListAPIView, post_reserve, remove_reserve


app_name = 'posts'

urlpatterns = [
    path('posts/', PostListAPIView.as_view(), name='posts_list'),
    path('posts/<int:pk>/', PostDetailAPIView.as_view(), name='post_detail'),
    path('posts/<int:pk>/reserve/', post_reserve, name='post_reserve'),
    path('posts/<int:pk>/remove-reserve/', remove_reserve, name='remove_reserve'),
    path('posts/user/', AuthorPostListAPIView.as_view(), name='user_posts'),
    path('posts/admin/', AdminPostListAPIView.as_view(), name='admin_posts'),
]