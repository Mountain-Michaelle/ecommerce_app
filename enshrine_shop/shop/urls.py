from django.urls import path
from .views import ProductListView, ProductDetailView, ProductCategoryView, ProductImgView, ProductImages, ProductSearchList



urlpatterns = [
    path('products/', ProductListView.as_view()),
    path('product/<str:slug>/', ProductDetailView.as_view()),
    path('product/<slug:slug>/images/', ProductImages.as_view()),
    path('products/category/', ProductCategoryView.as_view()),
    path('search/', ProductSearchList.as_view()),
    
    #### testing urls
    #path('products/<slug:slug>/', ProductImgView.as_view()),
    
    
]
