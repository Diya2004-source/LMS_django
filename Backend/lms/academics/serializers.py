from rest_framework import serializers
from .models import Lesson , Course , Enrollment

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id' , 'title' , 'content' , 'course']

class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True) # Nested serializer to include lessons in course representation
    class Meta:
        model = Course
        fields = ['id' , 'title' , 'description' ,'thumbnail' ,'price' , 'lessons']

class EnrollmentSerializer(serializers.ModelSerializer):
    course_details = CourseSerializer(source='course', read_only=True) # Nested serializer to include course details in enrollment representation

    class Meta:
        model = Enrollment
        fields = ['id', 'user', 'course', 'progress_percentage', 'enroll_date', 'course_details']