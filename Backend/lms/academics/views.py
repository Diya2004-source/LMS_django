from rest_framework import viewsets
from .models import Course, Lesson, Enrollment
from .serializers import CourseSerializer, LessonSerializer, EnrollmentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import StudentActivity, Course
from datetime import date

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

class TrackStudentActivity(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        course_id = request.data.get('course_id')
        seconds = request.data.get('seconds', 0)
        
        # Get or Create the activity record for today
        activity, created = StudentActivity.objects.get_or_create(
            user=request.user,
            course_id=course_id,
            date=date.today()
        )
        
        activity.seconds_spent += int(seconds)
        activity.save()
        
        return Response({"status": "success", "total_today": activity.seconds_spent})