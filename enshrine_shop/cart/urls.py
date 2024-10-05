from django.urls import path
from .views import AddToCartView, RemoveFromCartView, DetailCart, cart_time, server_time


urlpatterns = [
    path('add/', AddToCartView.as_view()),
    path('detail/', DetailCart.as_view()),
    path('remove/', RemoveFromCartView.as_view()),
    path('time/', cart_time, name="cart_time"),
    path('time/now/', server_time, name="server_time")
]
