from rest_framework import permissions
import datetime


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user == obj.author:
            return True

        if request.method in ['PUT', 'PATCH']:
            if obj.status in ['PST', 'SUB', 'TKS']:
                if request.user.is_superuser:
                    return True
                else:
                    return False
            if obj.status in ['DRA', 'TKS']:
                if request.user == obj.author:
                    return True
                else:
                    return False

            if obj.status in ['PST', 'TKS']:
                if request.user != obj.author:
                    return True
                else:
                    return False

        return False


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user.is_superuser:
            return True
        else:
            return False