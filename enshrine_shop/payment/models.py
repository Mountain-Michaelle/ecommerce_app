from django.db import models

# Create your models here.

class Customer(models.Model):
    first_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    customer_id = models.CharField(max_length=255, unique=True)
    
    def __str__(self):
        return self.email
    
class Address(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    address_id = models.CharField(max_length=2)
    street_address = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state_province = models.CharField(max_length=100)
    postal_zip_code = models.CharField(max_length=10)
    
    def __str__(self):
        return f'{self.customer.email}, Address Id is {self.address_id}'


class PaymentMethod(models.Model):
    
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    billing_address = models.ForeignKey(Address, on_delete=models.CASCADE)
    token = models.CharField(max_length=36, unique=True)
    
    def __str__(self):
        return self.token

class Order(models.Model):
    transaction_id = models.CharField(max_length=255, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True) 
    
    def __str__(self):
        return self.transaction_id

