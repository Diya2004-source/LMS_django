from django.contrib.auth.models import AbstractUser  # AbstractUser already has name, email, and password fields
from django.db import models

class User(AbstractUser): # Inheriting AbstractUser is the industry standard
    CHOICE = (
        ('student', 'Student'),
        ('teacher', 'Teacher'),
    )
    role = models.CharField(max_length=20, choices=CHOICE, default='student') # Role field to distinguish between students and teachers
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True) # Optional profile picture field

    def __str__(self):
        return f"{self.username} ({self.role})"