from rest_framework import serializers

from .models import Company, Department, Employee


class CompanySerializer(serializers.ModelSerializer):
    number_of_departments = serializers.ReadOnlyField()
    number_of_employees = serializers.ReadOnlyField()

    class Meta:
        model = Company
        fields = (
            "id",
            "name",
            "number_of_departments",
            "number_of_employees",
        )


class DepartmentSerializer(serializers.ModelSerializer):
    number_of_employees = serializers.ReadOnlyField()

    class Meta:
        model = Department
        fields = (
            "id",
            "company",
            "name",
            "number_of_employees",
        )


class EmployeeSerializer(serializers.ModelSerializer):
    days_employed = serializers.ReadOnlyField()

    class Meta:
        model = Employee
        fields = (
            "id",
            "company",
            "department",
            "employee_name",
            "email",
            "mobile_number",
            "address",
            "designation",
            "hired_on",
            "days_employed",
        )
