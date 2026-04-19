from django.db import models
from django.conf import settings

class Fee(models.Model):
    STATUS_CHOICES = (
        ('paid', 'Paid'),
        ('unpaid', 'Unpaid'),
        ('partially_paid', 'Partially Paid'),
    )

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) # Referring to User model via settings is more flexible
    total_amount = models.DecimalField(max_digits=10, decimal_places=2) # Increased max_digits for larger fees
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0) # Default to 0 for new fee records
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='unpaid') # Corrected length/default
    updated_at = models.DateTimeField(auto_now=True) # Automatically updates when the record is saved

    @property
    def balance(self):
        return self.total_amount - self.paid_amount

class Attendance(models.Model):
    STATUS_CHOICES = (
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('late', 'Late'),
    )

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) # Referring to User model via settings is more flexible
    date = models.DateField() # Date of the attendance record
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='present') # Corrected length/default

    class Meta:
        unique_together = ('student', 'date') # A student can't have two attendance records on the same day