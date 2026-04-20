from django.db import models
from django.conf import settings

class Course(models.Model):
    title = models.CharField(max_length=200) # Course title
    description = models.TextField() # Detailed course description
    thumbnail = models.ImageField(upload_to='course_thumbnails/', null=True, blank=True) # Optional thumbnail field
    price = models.DecimalField(max_digits=10, decimal_places=2) # Increased max_digits

    def __str__(self):
        return self.title

class Lesson(models.Model):
    course = models.ForeignKey(Course, related_name='lessons', on_delete=models.CASCADE) # Each lesson belongs to a course
    title = models.CharField(max_length=200) # Lesson title
    video_url = models.URLField(blank=True, null=True) # Allowed blank for text-only lessons
    content = models.TextField() # Lesson content
    order = models.PositiveIntegerField() # Order of the lesson within the course

    class Meta:
        ordering = ['order'] # Ensures curriculum order automatically

class Enrollment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='enrollments', on_delete=models.CASCADE) # Referring to User model via settings is more flexible
    course = models.ForeignKey(Course, related_name='enrollments', on_delete=models.CASCADE) # Each enrollment belongs to a course
    progress_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00) # Progress percentage for the enrollment
    enroll_date = models.DateTimeField(auto_now_add=True) # Date when the user enrolled in the course

    class Meta:
        unique_together = ('user', 'course') # Prevents double enrollment

class StudentActivity(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    
    # Track specific metrics
    seconds_spent = models.PositiveIntegerField(default=0)
    pages_visited = models.PositiveIntegerField(default=1)
    last_active = models.DateTimeField(auto_now=True)
    
    # This will help the AI analyze trends by date
    date = models.DateField(auto_now_add=True)

    class Meta:
        # One entry per user per course per day
        unique_together = ('user', 'course', 'date')

    def __str__(self):
        return f"{self.user.username} - {self.course.title} - {self.date}"

class StudentRiskScore(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    risk_percentage = models.FloatField(default=0.0) # 0 to 100
    risk_level = models.CharField(max_length=10, default="Low") # Low, Medium, High
    last_calculated = models.DateTimeField(auto_now=True)
    reason = models.TextField(blank=True, null=True) # e.g., "Inactive for 5 days"

    def __str__(self):
        return f"{self.user.username} - {self.risk_level} Risk"