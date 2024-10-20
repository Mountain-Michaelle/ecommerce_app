from django.shortcuts import render
from .serializers import ProductSerializers, ImageSerializer
from .models import Product, Image
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.contrib.postgres.search import TrigramSimilarity

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
class ProductListView(ListAPIView):
    queryset = Product.objects.order_by('-updated').filter(is_available=True)
    serializer_class = ProductSerializers
    lookup_field = 'slug'
  
  
class ProductDetailView(RetrieveAPIView):
    serializer_class = ProductSerializers
    queryset = Product.objects.all()
    lookup_field = 'slug'
    
    
class ProductImages(ListAPIView):
    serializer_class = ImageSerializer
    def get_queryset(self):
        slug = self.kwargs['slug']
        product = Product.objects.get(slug=slug)
        return Image.objects.filter(product=product)
        
    
class ProductCategoryView(ListAPIView):
    serializer_class = ProductSerializers
    def post(self, request, format=None):
        data = self.request.data
        category = data['category']
        queryset = Product.objects.order_by('-created').filter(category___iexact=category)
        serializer = ProductSerializers(queryset, many=True)
        return Response(serializer.data)
    
class ProductImgView(APIView):
    def get(self, request, *args, **kwargs):
        
        try:
            slug = kwargs.get('slug')
            try:
                prod = Product.objects.get(slug=slug)
            except Product.DoesNotExist:
                return Response({'error': "Product don't exist"}, status=status.HTTP_404_NOT_FOUND)
            
            if Image.objects.filter(product=prod).exists():
                if Product.objects.filter(is_available=True):
                    image = Image.objects.filter(product=prod)
                    img_serializer = ImageSerializer(image, many=True).data
                    return Response(img_serializer, status=status.HTTP_200_OK)

                else:
                    return Response({'error': 'Product is not available now'})
            else:
                return Response({'error':  f"Product don't exist {slug}"})
        except:
            return Response({'error': 'Something went wrong'})
        
class ProductSearchList(ListAPIView):
    serializer_class = ProductSerializers
    
    def get_queryset(self):
        queryset = Product.objects.all()
        query = self.request.query_params.get('query', None)
        
        if query:
            queryset = queryset.annotate(similarity=TrigramSimilarity('name', query),).filter(similarity__gt=0.1).order_by('-similarity')
            return queryset
        else:
            print("No queryset provided")
        
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['search_query'] = self.request.query_params.get('query', '')
        return context