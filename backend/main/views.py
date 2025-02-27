from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Company, Department, Employee
from .permissions import IsAdmin, IsEmployee, IsManager
from .serializers import CompanySerializer, DepartmentSerializer, EmployeeSerializer


@extend_schema(tags=["Company"])
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated, IsAdmin]


@extend_schema(tags=["Department"])
class DepartmentViewSet(viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, (IsAdmin | IsManager)]

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
    permission_classes = [IsAuthenticated, (IsAdmin | IsManager | IsEmployee)]

    def get_queryset(self):
        user = self.request.user 
        if user.role == "admin":
            return Employee.objects.all()
        if user.role == "manager":
            return Employee.objects.filter(company=user.company)
        if user.role == "employee":
            return Employee.objects.filter(email=user.email)

        return Employee.objects.none()
