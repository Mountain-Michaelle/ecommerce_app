from rest_framework import serializers
from .models import Category, Product, Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'images',)
        
        
class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'category', 'suggested', 'featured', 'most_popular', 'images', 'name', 'slug', 'description', 'excerpt', 'price' , 'created', 'updated',)
        depth=1
        
        