from django.urls import path, re_path
from . import views 
from django.views.generic import TemplateView

urlpatterns = [
    path('generate-token/', views.GenerateTokenView.as_view()),
    path('process-payment/', views.ProcessPaymentView.as_view())
]