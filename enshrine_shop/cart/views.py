from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from .cart import Cart
from shop.models import Product
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.shortcuts import redirect, get_object_or_404
import json 
from django.http import JsonResponse
from django.utils import timezone
from shop.serializers import ProductSerializers
# Create your views here.

@method_decorator(csrf_exempt, name="dispatch")
class AddToCartView(APIView):
    def post(self, request, format=None):
       
        data = self.request.data
        product_id = data['product_id']
        quantity = data['quantity']
        override = data['override']
        cart = Cart(request)
        
        try:
            product = get_object_or_404(Product, id=product_id)
        except ObjectDoesNotExist:
            return Response({'error': "Product not available"})

        
        if Product.objects.filter(name=product).exists:
            if Product.objects.filter(is_available=True):
                product_serialized = ProductSerializers(product, many=True)
                cart.add(
                    product=product,
                    quantity=quantity,
                    override_quantity=override
                )
                return Response({"error" : f"Success product {product}"})
                
            else:
                return Response({"error": "Product not currently available"})
        else:
            return Response({"error" : "Product don't exist"})
        
@method_decorator(csrf_exempt, name="dispatch")
class RemoveFromCartView(APIView):
    
    def post(self, request, format=None):
        
        data = self.request.data
        
        product_id = data['product_id']
        cart = Cart(request)
        
        try:
            product = Product.objects.get(id=product_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Product not found'})
        
        if Product.objects.filter(id=product_id).exists:
            cart.remove(product=product)
        else:
            return Response({'error': 'Product does not exist'})
        
        
class DetailCart(APIView):
    def get(self, request, format=None):
        try:
            cart = Cart(request)
            return Response(cart)
        
        except:
            return Response({"error": "Error fetching data"})
        

def cart_time(request):
    
    try:
        server_time = timezone.now()
        
        expiration_time = server_time + timezone.timedelta(weeks=2)
        
        clear_local_storage = request.GET.get('clearLocalStorage', False)
        if clear_local_storage:
            response = JsonResponse({'serverTime': server_time.isoformat(), 'expirationTime' : None})
            response.delete_cookie('localStorageKey')
            return response
        
        # Set the expiration time in a cookie for the client-side to read
        response = JsonResponse({'serverTime': server_time.isoformat(), 'expirationTime': expiration_time.isoformat()})
        response.set_cookie('localStorageKey', 'someValue', expires=expiration_time)
        return response
    except:
        return JsonResponse({"error": "Something went wrong"})
    
def server_time(request):
    try:
        serverTime = timezone.now().isoformat()
        return JsonResponse({'server': serverTime})
    except:
        return JsonResponse({'error': 'Somtehing went wrong'})