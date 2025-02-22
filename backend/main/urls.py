from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("company", views.CompanyViewSet, basename="company")
router.register("department", views.DepartmentViewSet, basename="department")
router.register("employee", views.EmployeeViewSet, basename="employee")

urlpatterns = router.urls
