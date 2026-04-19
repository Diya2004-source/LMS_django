from rest_framework import serializers
from .models import Fee, Attendance

class FeeSerializer(serializers.ModelSerializer):
    balance = serializers.ReadOnlyField() # Calls the @property from your model

    class Meta:
        model = Fee
        fields = ['id', 'student', 'total_amount', 'paid_amount', 'status', 'balance', 'updated_at']

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['id', 'student', 'date', 'status']