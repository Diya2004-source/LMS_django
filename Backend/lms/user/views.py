from rest_framework import viewsets, permissions, generics # Added generics
from rest_framework.permissions import AllowAny # Added AllowAny
from .models import User
from .serializers import UserSerializer, RegisterSerializer # Added RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer # Import your new custom serializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Only admin can create, update, or delete users
    def get_permissions(self):
        if self.action == 'list':
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]
    
# This handles NEW users signing up
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,) 
    serializer_class = RegisterSerializer

class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer