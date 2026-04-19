from rest_framework import serializers
from .models import User

# This handles data for existing users
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'profile_picture']

# This handles data for NEW user registration
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # Password won't be shown in response

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'role']

    def create(self, validated_data):
        # We use create_user so Django hashes the password correctly
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            role=validated_data.get('role', 'student')
        )
        return user