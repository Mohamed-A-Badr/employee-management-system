from drf_spectacular.utils import extend_schema
from rest_framework import viewsets

from .models import Company, Department, Employee
from .serializers import CompanySerializer, DepartmentSerializer, EmployeeSerializer


@extend_schema(tags=["Company"])
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


@extend_schema(tags=["Department"])
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


@extend_schema(tags=["Employee"])
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
