from rest_framework import viewsets
from .models import Course, Lesson, Enrollment
from .serializers import CourseSerializer, LessonSerializer, EnrollmentSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    # This single viewset handles:
    # GET /courses/ (Discovery)
    # POST /courses/ (Admin Create)
    # GET /courses/id/ (View details with Lessons)

class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        # An admin can see ALL enrollments
        user = self.request.user
        if user.is_staff or (hasattr(user, 'role') and user.role == 'teacher'):
            return Enrollment.objects.all()
        return Enrollment.objects.filter(user=user)