"""
API URL Configuration

Maps all API endpoints using DRF routers.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .views import (
    ProjectViewSet, SkillViewSet, ExperienceViewSet,
    EducationViewSet, BlogPostViewSet, ContactMessageViewSet,
    health_check,
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'experience', ExperienceViewSet, basename='experience')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'blog', BlogPostViewSet, basename='blog')
router.register(r'contact', ContactMessageViewSet, basename='contact')

urlpatterns = [
    # Health check
    path('health/', health_check, name='health-check'),
    
    # JWT Authentication
    path('auth/login/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('auth/verify/', TokenVerifyView.as_view(), name='token-verify'),
    
    # API endpoints
    path('', include(router.urls)),
]
