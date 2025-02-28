from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("company", views.CompanyViewSet, basename="company")
router.register("department", views.DepartmentViewSet, basename="department")
router.register("employee", views.EmployeeViewSet, basename="employee")

urlpatterns = [
    path("list/company/", views.company_list, name="all_company_list"),
    path(
        "list/department/<int:pk>/", views.department_list, name="all_department_list"
    ),
] + router.urls
