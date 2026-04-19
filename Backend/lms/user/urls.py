from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# Import the RegisterView you created in views.py
from .views import RegisterView 

urlpatterns = [
    # 1. Registration Endpoint
    path('register/', RegisterView.as_view(), name='auth_register'),

    # 2. Login Endpoint (Get Access/Refresh tokens)
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # 3. Refresh Endpoint (Get new Access token)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]