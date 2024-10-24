from django.db import models
# Create your models here.
from django.contrib.postgres.search import SearchVectorField
from django.contrib.postgres.indexes import GinIndex
import uuid

class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    
    class Meta:
        ordering = ['name']
        indexes = [models.Index(fields=['name'],)]
        
        verbose_name = 'category'
        verbose_name_plural = 'categories'
    
    def __str__(self):
        return self.name


class Image(models.Model):
    images = models.FileField(upload_to='products/%Y/%m/%d', blank=True)
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='product_image')
    
    class Meta:
        ordering = ['images']
    def __str__(self):
        return f'{self.product.name} image  = {self.images}' 
    
      
class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='product')
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    images = models.FileField(upload_to='products/%Y/%m/%d', blank=True, null=True)
    description = models.TextField(blank=True)
    excerpt = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)
    most_popular = models.BooleanField(null=True, blank=True, default=False)
    suggested = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['id', 'slug']),
            models.Index(fields=['name']),
            models.Index(fields=['description'],),
            models.Index(fields=['-created']),
        ]
        
    def __str__(self):
        return self.name
    
    def add_image(self, images):
        Image.objects.create(product=self, images=images)
