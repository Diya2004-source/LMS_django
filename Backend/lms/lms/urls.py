from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/academics/', include('academics.urls')),  # Include academics app URLs
    path('api/user/', include('user.urls')),       # Include user app URLs
    path('api/details/', include('details.urls')),    # Include details app URLs
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)