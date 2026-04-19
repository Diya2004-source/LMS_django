from rest_framework import viewsets
from .models import Fee, Attendance
from .serializers import FeeSerializer, AttendanceSerializer

class FeeViewSet(viewsets.ModelViewSet):
    serializer_class = FeeSerializer

    def get_queryset(self):
        # Security: Students only see their own fee status
        user = self.request.user
        if user.is_staff:
            return Fee.objects.all()
        return Fee.objects.filter(student=user)

class AttendanceViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Attendance.objects.all()
        return Attendance.objects.filter(student=user)