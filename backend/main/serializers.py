from accounts.utils import valid_email, valid_phone_number
from rest_framework import serializers

from .models import Company, Department, Employee
from accounts.models import CustomUser

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
    company_name = serializers.SerializerMethodField()

    class Meta:
        model = Department
        fields = (
            "id",
            "name",
            "company",
            "company_name",
            "number_of_employees",
        )
        extra_kwargs = {
            "company": {"write_only": True},
        }

    def get_company_name(self, obj):
        return obj.company.name


class EmployeeSerializer(serializers.ModelSerializer):
    days_employed = serializers.ReadOnlyField()
    company_name = serializers.SerializerMethodField()
    department_name = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = (
            "id",
            "company",
            "department",
            "company_name",
            "department_name",
            "employee_name",
            "email",
            "mobile_number",
            "role",
            "address",
            "designation",
            "hired_on",
            "days_employed",
        )
        extra_kwargs = {
            "company": {"write_only": True},
            "department": {"write_only": True},
        }

    def get_role(self, obj):
        user = CustomUser.objects.filter(email=obj.email).first()
        if user.role:
            return user.role
        return " "
        
    
    def get_company_name(self, obj):
        return obj.company.name

    def get_department_name(self, obj):
        return obj.department.name

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

    
    def create(self, validated_data):
        employee = super().create(validated_data)
        temp_password = "testpassword1234"
        user_data = {
            "username": employee.employee_name,
            "email": employee.email,
            "password": temp_password,
            "role": validated_data.get("role"),
            "company": employee.company,
        }
        CustomUser.objects.create_user(**user_data)
        return employee
    