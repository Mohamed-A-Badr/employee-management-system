from typing import override
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from accounts.models import CustomUser

from .models import Company, Department, Employee
from .permissions import CompanyPermission, DepartmentPermission, EmployeePermission
from .serializers import CompanySerializer, DepartmentSerializer, EmployeeSerializer
import logging

logger = logging.getLogger("main.views")


@extend_schema(tags=["Company"])
class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated, CompanyPermission]

    def get_queryset(self):
        user = self.request.user
        if user.role == "admin":
            return Company.objects.all()
        if user.role == "manager":
            employee = Employee.objects.filter(email=user.email).first()
            if employee:
                return Company.objects.filter(id=employee.company.id)
        return Company.objects.none()


@extend_schema(tags=["Department"])
class DepartmentViewSet(viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, DepartmentPermission]

    def get_queryset(self):
        user = self.request.user
        if user.role == "admin":
            return Department.objects.all()
        if user.role == "manager":
            return Department.objects.filter(company=user.company)
        return Department.objects.none()


@extend_schema(tags=["Employee"])
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated, EmployeePermission]

    def get_queryset(self):
        user = self.request.user
        if user.role == "admin":
            return Employee.objects.all()
        if user.role == "manager":
            return Employee.objects.filter(company=user.company)
        if user.role == "employee":
            return Employee.objects.filter(email=user.email)

        return Employee.objects.none()
