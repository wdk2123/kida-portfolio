"""
API Views for Portfolio Backend

ViewSets and API views with proper authentication, permissions,
throttling, and filtering.
"""
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import Project, Skill, Experience, Education, BlogPost, ContactMessage
from .serializers import (
    ProjectSerializer, ProjectListSerializer,
    SkillSerializer, ExperienceSerializer,
    EducationSerializer, BlogPostSerializer,
    BlogPostListSerializer, ContactMessageSerializer,
)


class IsAdminOrReadOnly(permissions.BasePermission):
    """Custom permission: admin can edit, others read-only."""
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class ProjectViewSet(viewsets.ModelViewSet):
    """
    CRUD for Projects.
    
    list: Return all projects (paginated)
    retrieve: Return a single project
    create: Create a new project (admin only)
    update: Update a project (admin only)
    destroy: Delete a project (admin only)
    """
    queryset = Project.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'featured']
    search_fields = ['title', 'description', 'technologies']
    ordering_fields = ['created_at', 'title', 'order']

    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectListSerializer
        return ProjectSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured projects only."""
        featured = self.queryset.filter(featured=True)
        serializer = ProjectListSerializer(featured, many=True)
        return Response(serializer.data)


class SkillViewSet(viewsets.ModelViewSet):
    """CRUD for Skills."""
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['category']
    ordering_fields = ['level', 'name', 'category']


class ExperienceViewSet(viewsets.ModelViewSet):
    """CRUD for Experience."""
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [IsAdminOrReadOnly]


class EducationViewSet(viewsets.ModelViewSet):
    """CRUD for Education."""
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [IsAdminOrReadOnly]


class BlogPostViewSet(viewsets.ModelViewSet):
    """
    CRUD for Blog Posts.
    
    Unauthenticated users only see published posts.
    """
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'featured', 'is_published']
    search_fields = ['title', 'excerpt', 'tags']
    ordering_fields = ['published_at', 'title']

    def get_queryset(self):
        if self.request.user.is_staff:
            return BlogPost.objects.all()
        return BlogPost.objects.filter(is_published=True)

    def get_serializer_class(self):
        if self.action == 'list':
            return BlogPostListSerializer
        return BlogPostSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured blog posts."""
        featured = self.get_queryset().filter(featured=True)
        serializer = BlogPostListSerializer(featured, many=True)
        return Response(serializer.data)


class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    Handle contact form submissions.
    
    POST: Anyone can submit a message (throttled).
    GET/LIST: Admin only.
    """
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return ContactMessage.objects.all()

    def get_throttles(self):
        if self.action == 'create':
            return [AnonRateThrottle()]
        return super().get_throttles()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {'data': serializer.data, 'message': 'Message sent successfully!'},
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    @action(detail=True, methods=['patch'])
    def mark_read(self, request, pk=None):
        """Mark a message as read (admin only)."""
        message = self.get_object()
        message.is_read = True
        message.save()
        return Response({'status': 'marked as read'})


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def health_check(request):
    """API health check endpoint."""
    return Response({
        'status': 'healthy',
        'service': 'Portfolio API',
        'version': '1.0.0',
    })
