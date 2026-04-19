from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeeViewSet, AttendanceViewSet

router = DefaultRouter()
router.register(r'fees', FeeViewSet , basename='fee')
router.register(r'attendance', AttendanceViewSet, basename='attendance')

urlpatterns = [
    path('', include(router.urls)),
]