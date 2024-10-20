from django.shortcuts import render
import braintree
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Customer, Address, PaymentMethod, Order
# Create your views here.


gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id=settings.BT_MERCHANT_ID,
        public_key=settings.BT_PUBLIC_KEY,
        private_key=settings.BT_PRIVATE_KEY,
        
    )
)

class GenerateTokenView(APIView):
    def get(self, request, format=None):
        
        try:
            client_token = gateway.client_token.generate({
                'merchant_account_id': 'enshrine'
            })
            
            return Response({'token': client_token})
        except Exception as e:
            print(e)
            return Response({'error': 'Something went wrong when retrieving payment detail'})
        
        
class ProcessPaymentView(APIView):
    def post(self, request, fromat=None):
        data = request.data
        email = data['email']
        first_name = data['first_name']
        country = data['country']
        nonce = data['nonce']      
        street_address = data['street_address']      
        city = data['city']    
        state_province = data['state_province']       
        postal_zip_code = data['postal_zip_code']        
        phone = data['phone']
       
        
        total_amount = '2000.00'
        
        if country == 'nigeria':
            country_name = 'Nigeria'
            country_code = 'NG'
        
        else:
            country_name = 'United States'
            country_code = 'US'
            
        ## Check customers credentials 
        if Customer.objects.filter(email=email).exists():
            customer = Customer.objects.get(email=email)
            customer_id = str(customer.id)
            
            #Ensure customer exists in braintree
            try:
                gateway.customer.find(customer_id)
            except:
                result = gateway.customer.create({
                       'first_name': str(first_name),
                       'email': str(email)
                })
                
                if result.is_success:
                    customer_id = str(result.customer.id)
                    Customer.objects.filter(email=email).update(customer_id=customer_id)
                    customer = Customer.objects.get(email=email)
                else:
                    return Response({'error': 'Customer information invalid'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            result = gateway.customer.create({
                'first_name': str(first_name),
                'email': str(email),
            })
            if result.is_success:
                customer_id = str(result.customer.id)
                customer = Customer.objects.create( 
                    first_name=first_name,
                    email=email,
                    customer_id=customer_id,
                )
            else:
                return Response({'error': f'Failed to create customer'}, status=status.HTTP_400_BAD_REQUEST)

        if Address.objects.filter(
                    customer=customer,
                    street_address=street_address,
                    country = country,
                    city = city,
                    phone=phone,
                    state_province = state_province,
                    postal_zip_code = postal_zip_code).exists():
            
            address = Address.objects.get(
                    customer=customer,
                    street_address=street_address,
                    country = country,
                    phone=phone,
                    city = city,
                    state_province = state_province,
                    postal_zip_code = postal_zip_code)
            address_id = address.address_id
            
            try:
                result = gateway.address.find(customer_id, address_id ) 
            except:
                result = gateway.address.create({
                    'customer_id': customer_id,
                    'street_address': street_address,
                    'locality': city,
                    'phone_number': phone,
                    'region': state_province,
                    'postal_code': postal_zip_code,
                    'country_name': country_name,
                    'country_code_alpha2': country_code, 
                })   
                if result.is_success:
                    address_id = str(result.address.id)
                    Address.objects.filter(
                    customer=customer,
                    street_address=street_address,
                    country = country,
                    phone=phone,
                    city = city,
                    state_province = state_province,
                    postal_zip_code = postal_zip_code
                    ).update(
                        address_id = address_id,
                    )

                else:
                    return Response({'error': f'Adddress Invalid => {result}'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            result = gateway.address.create({
                    'customer_id': customer_id,
                    'street_address': street_address,
                    'locality': city,
                    'region': state_province,
                    'phone_number': phone,
                    'postal_code': postal_zip_code,
                    'country_name': country_name,
                    'country_code_alpha2': country_code, 
            })

            if result.is_success:
                address_id = str(result.address.id)
                Address.objects.create(
                    customer=customer,
                    address_id=address_id,
                    street_address=street_address,
                    phone=phone,
                    country = country,
                    city = city,
                    state_province = state_province,
                    postal_zip_code = postal_zip_code
                )
                
                address = Address.objects.get(
                    customer=customer,
                    address_id=address_id,
                    street_address=street_address,
                    country = country,
                    phone=phone,
                    city = city,
                    state_province = state_province,
                    postal_zip_code = postal_zip_code)
            
            else:
                return Response({'error': f'Faid to create address => {result} '})
        
        result = gateway.payment_method.create({
            'customer_id': customer_id,
            'billing_address_id': address_id,
            'payment_method_nonce': nonce,                
        })
        
        if result.is_success:
            token = str(result.payment_method.token)
            
            PaymentMethod.objects.create(
                customer=customer,
                billing_address = address,
                token=token
            )
            
            payment_method = PaymentMethod.objects.get(
                customer=customer,
                billing_address = address,
                token=token
            )
        else:
            return Response({'error': f'Failed to create payment method {result} see it her {customer_id} '}, status=status.HTTP_400_BAD_REQUEST)
        
        result = gateway.transaction.sale({
            'customer_id': customer_id,
            'amount': total_amount,
            'payment_method_token': token,
            'billing_address_id': address_id,
            'shipping_address_id': address_id,
            'options': {
                'submit_for_settlement': True
            }
        })
            
        if result.is_success:
            transaction_id = str(result.transaction.id)
            
            Order.objects.create(
                transaction_id=transaction_id,
                customer = customer,
                address=address,
                payment_method=payment_method
            )
            
            return Response({'success': 'Transaction Successfull!'}, status=status.HTTP_201_CREATED)
            
        else:
            return Response({'error': f'Failed to process transaction {result} this is the id {str(customer_id)}'}, status=status.HTTP_400_BAD_REQUEST)