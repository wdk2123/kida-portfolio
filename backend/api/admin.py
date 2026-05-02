"""
Django Admin Configuration

Custom admin interface for managing portfolio content.
"""
from django.contrib import admin
from .models import Project, Skill, Experience, Education, BlogPost, ContactMessage


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'featured', 'order', 'created_at']
    list_filter = ['category', 'featured', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['featured', 'order']
    ordering = ['order', '-created_at']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'level', 'order']
    list_filter = ['category']
    search_fields = ['name']
    list_editable = ['level', 'order']
    ordering = ['category', 'order']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['role', 'company', 'current', 'start_date', 'end_date', 'order']
    list_filter = ['current', 'company']
    search_fields = ['role', 'company', 'description']
    list_editable = ['current', 'order']
    ordering = ['order', '-start_date']


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'field', 'start_date', 'end_date', 'order']
    list_filter = ['institution']
    search_fields = ['degree', 'institution', 'field']
    list_editable = ['order']
    ordering = ['order', '-start_date']


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'featured', 'is_published', 'read_time', 'published_at']
    list_filter = ['category', 'featured', 'is_published', 'published_at']
    search_fields = ['title', 'excerpt', 'content']
    list_editable = ['featured', 'is_published']
    prepopulated_fields = {'slug': ('title',)}
    ordering = ['-published_at']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'replied', 'created_at']
    list_filter = ['is_read', 'replied', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    list_editable = ['is_read', 'replied']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    ordering = ['-created_at']

    def has_add_permission(self, request):
        return False
