from django.contrib import admin
from django.db import models
from django import forms
from django.contrib.postgres.fields import ArrayField
from django.forms.widgets import ClearableFileInput, FileInput, MultiWidget
from .models import Category, Product, Image
# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
                 
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'price', 'is_available', 'created', 'updated']
    list_filter = ['is_available', 'created', 'updated']
    list_editable = ['price', 'is_available']
    prepopulated_fields = {'slug': ('name',)}
    
@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'images']