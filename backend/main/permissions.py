from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "Admin"


class IsManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "Manager"


class IsEmployee(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "Employee"
