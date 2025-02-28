from typing import override
from rest_framework import permissions


class CompanyPermission(permissions.BasePermission):
    @override
    def has_permission(self, request, view):
        user = request.user
        if user.role == "admin":
            return True
        if user.role == "manager":
            if request.method in permissions.SAFE_METHODS:
                return True
        return False

class DepartmentPermission(permissions.BasePermission):
    @override
    def has_permission(self, request, view):
        user = request.user
        if user.role in ['admin', 'manager']:
            return True
        return False

class EmployeePermission(permissions.BasePermission):
    @override
    def has_permission(self, request, view):
        user = request.user
        if user.role in ['admin', 'manager']:
            return True
        if user.role == 'employee':
            if request.method in permissions.SAFE_METHODS:
                return True
        return False
