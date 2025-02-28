from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "admin"


class IsManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "manager"


class IsEmployee(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "employee"


class IsAdminOrManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ["admin", "manager"]


class IsAdminOrManagerOrOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ["admin", "manager"]

    def has_object_permission(self, request, view, obj):
        # Allow users to access their own data
        return (
            request.user.role in ["admin", "manager"] or 
            request.user == obj
        )
