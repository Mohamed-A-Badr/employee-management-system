from accounts.utils import valid_email, valid_phone_number
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
            "name",
            "company",
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

    def validate(self, attrs):
        # Chack email format and exist
        email = attrs.get("email")
        if not valid_email(email):
            raise serializers.ValidationError("Invalid Email")

        if Employee.objects.filter(email=email).exists():
            raise serializers.ValidationError("This Email already exist")

        # check phone number format
        phone = attrs.get("mobile_number")
        valid_phone_number(phone)

        if Employee.objects.filter(mobile_number=phone).exists():
            raise serializers.ValidationError("This phone number already exist")

        # check the department belong to the company or not
        department = attrs.get("department")
        company = attrs.get("company")
        if department.company != company:
            raise serializers.ValidationError(
                f"This department '{department}' not exists in this company '{company}'"
            )

        return super().validate(attrs)
