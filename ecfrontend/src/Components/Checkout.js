import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import {Link, useNavigate} from 'react-router-dom'
import { EPopups } from './Reusable/EnshrinePopups';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import * as Yup from 'yup';
import DropIn from 'braintree-web-drop-in-react';
import {TailSpin, Oval} from 'react-loader-spinner';
import '../Assets/css/Checkout.css';
import { getBasketTotal } from '../Redux/Actions/cart';
import { connect } from 'react-redux';
import { cart_detail } from '../Redux/Actions/cart';
import image from '../Assets/css/static/camera.jpg'
import { Button } from '@mui/material';
import ArrowDown from '@mui/icons-material/KeyboardArrowDownOutlined';
import ArrowUp from '@mui/icons-material/KeyboardArrowUpOutlined';


const Checkout = ({basket, user}) => {

    const [orderAttempted, setOrderAttempted] = useState([]);  
    const [clientToken, setClientToken] = useState('')
    const [loading, setLoading] = useState(true)
    const [tokenError, setTokenError] = useState('')
    const [processingOrder, setProcessingOrder] = useState(false)
    const [created, setCreated] = useState(false)
    const [faild, setFaild] = useState(false)
    const [data, setData] = useState({
        instance: {}
    })


    const handleFirstName = (name) => {
        var nam = name?.name.split(" ")
        return name && nam[0]
    }
    const handleEmail = (name) => {
        var em = JSON.stringify(name)
        return name && em?.email

    }
    
    const [name, setName] = useState({nm: handleFirstName(user), eml:user?.email})

    useEffect(() => {
        if(user){
          setName({...name, nm: handleFirstName(user), eml: handleEmail(user)})
        }else{
            setName("")
        }
    },[user])

  
    const initialValues = {
        first_name: user ? name.nm : '', 
        email: user ? user?.email[0] : '',
        street_address:'' ,
        city:'' ,
        country:'' ,
        state_province:'' ,
        postal_zip_code: '',
        phone: '',
    }
    
    const validationSchema = Yup.object({
        first_name: Yup.string().required('Please Provide your First name').min(3, 'Invalid name').strict(true).trim(),
        email: Yup.string().email("Invalid email format").required('Please Provide your email'),
        street_address: Yup.string().required('Please Provide your Street address'),
        city: Yup.string().required('Please Provide your City'),
        country: Yup.string().required('Please Provide your Country'),
        state_province: Yup.string().required('Please Provide your state province'),
        postal_zip_code: Yup.string().required('Please Provide your postal code'),
        phone: Yup.string().required('Please Provide your phone')
    })
        const [isOpen, setIsOpen] = useState(false)

        const navigate = useNavigate()
        const formik = useFormik({
            initialValues,
            validationSchema,
            onSubmit : async values => {
            
                const {first_name, email, street_address, city, country, state_province, postal_zip_code, phone} = values;
                let {nonce} = await data.instance.requestPaymentMethod()
                setProcessingOrder(true)
            
                const config = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
                const body = JSON.stringify({first_name, email, nonce, street_address, city, country, state_province, postal_zip_code, phone})
                try{
                    const res = await axios.post(`${process.env.REACT_APP_ENDPOINT_URL}/payment/process-payment/`, body, config);
                    if(res.status === 201){
                        setCreated(true)
                        setOrderAttempted(res.status)
                    }else{
                        setCreated(false)
                        setFaild(true)
                        setProcessingOrder(false)
                    }
            
                }catch(err){
                    //
                } 
            setProcessingOrder(false)
        }
    })
    useEffect(() => {
        const config = {
            'Accept': 'application/json'
            }

        const fetchData = async () => {
        try{
           const res = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/payment/generate-token/`, config)
           if(res.data.token){
            setClientToken(res.data.token)
            setLoading(false)
            setProcessingOrder(false)
           }
           else if(res.error){
            setTokenError(res.error)
            console.log("is there error ", res.error)
            setLoading(false)
            setProcessingOrder(false)
           }
        }catch(error){
            // Error
        }
    }
    fetchData()
    },[])

    useEffect(() => {
        if(created){
            setCreated(true)
        }
    },[created])

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return(
        <div className='checkout'>
            {
                created ? (
                <EPopups 
                title='Thank you!'
                type={created}
                message='Your order had been placed successfully!'
                duration={7000}
                navigate={navigate}
                link='/'
                position='top-right'
            />  
                ):('')
            }
            <div className='address_left'>
            <h2>Product Checkout</h2>
                 <form className='checkout_form' noValidate onSubmit={formik.handleSubmit}>
                    <h3>Your Information</h3>
                    <div className='form_control'>
                        <label htmlFor='first_name'>first name</label>
                        <div className={`${formik.errors.first_name && formik.touched.first_name ? 'error_border  input icon' : 'upper_input input icon'}`} >
                             <input type='text' onChange={formik.handleChange} name='first_name' { ...formik.getFieldProps('first_name') } /> 
                            {
                             formik.errors.first_name && formik.touched.first_name ? <div className='errorOulined'><ErrorOutlineOutlinedIcon /></div>  : ""
                            }
                            {
                                formik.values.first_name && !formik.errors.first_name ? <div className='done'><DoneIcon /> </div>: ''
                            } 
                          
                        </div>
                        {
                            formik.touched.first_name && formik.errors ? <div  className='errors'>{formik.errors.first_name}</div> : ''
                        }
                    </div>

                    <div className='form_control'>
                        <label htmlFor='first_name'>Email</label>
                        <div className={`${formik.errors.email && formik.touched.email ? 'error_border  input icon' : 'upper_input input icon'}`} >
                             <input type='text' onChange={formik.handleChange} name='email' { ...formik.getFieldProps('email') } /> 
                            {
                             formik.errors.email && formik.touched.email ? <div className='errorOulined'><ErrorOutlineOutlinedIcon /></div>  : ""
                            }
                            {
                             !formik.errors.email && formik.values.email !== '' ? <div className='done'><DoneIcon /> </div>: ''
                            } 
                          
                        </div>
                        {
                            formik.touched.email && formik.errors ? <div className='errors'>{formik.errors.email}</div> : ''
                        }
                    </div>

                    <div className='form_control'>
                        <label htmlFor='street_address'>Street Address*</label>
                        <div className={`${formik.errors.first_name && formik.touched.first_name ? 'error_border  input icon' : 'upper_input input icon'}`} >
                             <input type='text' onChange={formik.handleChange} name='street_address' { ...formik.getFieldProps('street_address') } /> 
                            {
                             formik.errors.street_address && formik.touched.street_address ? <div className='errorOulined'><ErrorOutlineOutlinedIcon /></div>  : ""
                            }
                            {
                                formik.values.street_address.length > 2 && !formik.errors.street_address ? <div className='done'><DoneIcon /> </div>: ''
                            } 
                          
                        </div>
                        {
                            formik.touched.street_address && formik.errors ? <div className='errors'>{formik.errors.street_address}</div> : ''
                        }
                    </div>

                    <div className='form_control'>
                        <label htmlFor='street_address'>Phone*</label>
                        <div className={`${formik.errors.phone && formik.touched.phone ? 'error_border  input icon' : 'upper_input input icon'}`} >
                             <input type='text' onChange={formik.handleChange} name='phone' { ...formik.getFieldProps('phone') } /> 
                            {
                             formik.errors.phone && formik.touched.phone ? <div className='errorOulined'><ErrorOutlineOutlinedIcon /></div>  : ""
                            }
                            {
                                formik.values.phone.length > 10 && !formik.errors.phone ? <div className='done'><DoneIcon /> </div>: ''
                            } 
                          
                        </div>
                        {
                            formik.touched.phone && formik.errors ? <div className='errors'>{formik.errors.phone}</div> : ''
                        }
                    </div>

                    <div className='form_control'>
                        <label htmlFor='street_address'>City*</label>
                        <div className={`${formik.errors.city && formik.touched.city ? 'error_border  input icon' : 'upper_input input icon'}`} >
                             <input type='text' onChange={formik.handleChange} name='city' { ...formik.getFieldProps('city') } /> 
                            {
                             formik.errors.city && formik.touched.city ? <div className='errorOulined'><ErrorOutlineOutlinedIcon /></div>  : ""
                            }
                            {
                                formik.values.city.length > 2 && !formik.errors.city ? <div className='done'><DoneIcon /> </div>: ''
                            } 
                          
                        </div>
                        {
                            formik.touched.city && formik.errors ? <div className='errors'>{formik.errors.city}</div> : ''
                        }
                    </div>

                    <div className='form_bottom'>
                        <div className='form_control'>
                            <label htmlFor='state_province'>State province*</label>
                            <div className={`${formik.errors.state_province && formik.touched.state_province ? 'error_border  input icon' : 'upper_input input icon'}`} >
                                <input type='text' onChange={formik.handleChange} name='state_province' { ...formik.getFieldProps('state_province') } /> 
                                {
                                formik.errors.state_province && formik.touched.state_province ? <div className='errorOulined'><ErrorOutlineOutlinedIcon /></div>  : ""
                                }
                                {
                                    formik.values.state_province.length > 2 && !formik.errors.state_province ? <div className='done'><DoneIcon /> </div>: ''
                                } 
                            
                            </div>
                            {
                                formik.touched.state_province && formik.errors ? <div className='errors'>{formik.errors.state_province}</div> : ''
                            }
                        </div>

                        <div className='form_control'>
                        <label htmlFor='postal_zip_code'>Postal zip*</label>
                        <div className={`${formik.errors.postal_zip_code && formik.touched.postal_zip_code ? 'error_border  input icon' : 'upper_input input icon'}`} >
                             <input type='text' onChange={formik.handleChange} name='postal_zip_code' { ...formik.getFieldProps('postal_zip_code') } /> 
                            {
                             formik.errors.postal_zip_code && formik.touched.postal_zip_code ? <div className='errorOulined'><ErrorOutlineOutlinedIcon /></div>  : ""
                            }
                            {
                                formik.values.postal_zip_code.length > 2 && !formik.errors.postal_zip_code ? <div className='done'><DoneIcon /> </div>: ''
                            } 
                          
                        </div>
                        {
                            formik.touched.postal_zip_code && formik.errors ? <div className='errors'>{formik.errors.postal_zip_code}</div> : ''
                        }
                        </div>

                        <div className='form_control'>
                        <label htmlFor='street_address'>Country*</label>
                        <div className={`${formik.errors.country && formik.touched.country ? 'error_border  input icon' : 'upper_input input icon'}`} >
                             <select type='text' onChange={formik.handleChange} name='country' { ...formik.getFieldProps('country') }>
                                <option value="">Select opt..</option>
                                <option>Nigeria</option>
                                <option>USA</option>
                                <option>Ghana</option>
                                <option>Canada</option>
                            </select> 
                            {
                             formik.errors.country && formik.touched.country ? <div className='errorOulined'><ErrorOutlineOutlinedIcon /></div>  : ""
                            }
                            {
                                formik.values.country.length > 2 && !formik.errors.country ? <div className='done'><DoneIcon /> </div>: ''
                            } 
                          
                        </div>
                        {
                            formik.touched.country && formik.errors ? <div className='errors'>{formik.errors.country}</div> : ''
                        }
                        </div>
                    </div>
                    <div className='card_right display_card2'>
                        <span className='min'> <h2>Product Detail </h2>{basket.length <= 1 ? ('') : ( !isOpen ? <ArrowDown onClick={handleOpen} /> : <ArrowUp onClick={handleOpen}  /> )}</span>

                        {
                            basket.length  <= 1 ? (
                                <div>
                                <p>Your are ordering for <strong>{basket.length} </strong> product{'(s) '}</p>
                                {
                                    basket.map((item, index) => {
                                        return(
                                            <div className='card_right_product'>
                                                    <div className='card_right_product_img'><img src={image} alt="" /> </div>
            
                                                    <div className='card_right_product_details'>
                                                        <span className='flex'>{ item.title}</span> 
            
                                                        <span className='flex'><small>$</small><strong>{item.price} x {item.quantity} {' pieces(s)'}</strong></span> 
            
                                                        
                                                    </div>
                                                    
                                            </div>
                                        )
                                    })
                                }
                                <div className='total'>
                                    <div>
                                        Total Price <small>$</small><strong>{getBasketTotal(basket)}</strong>
                                        </div>
                                    <div>
                                    </div>
                                </div>
                                </div>
                            ) : (
                                isOpen &&
                                <div>
                                    <p>Order of <strong>{basket.length} </strong> product{'(s) '}</p>
                                    {
                                        basket.map((item, index) => {
                                            return(
                                                <div className='card_right_product'>
                                                        <div className='card_right_product_img'><img src={image} alt="" /> </div>
                
                                                        <div className='card_right_product_details'>
                                                            <span className='flex'>{ item.title}</span> 
                
                                                            <span className='flex'><small>$</small><strong>{item.price} x {item.quantity}{' pieces(s)'}</strong></span> 
                
                                                            
                                                        </div>
                                                        
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='total'>
                                        <div>
                                            Total Price <small>$</small><strong>{getBasketTotal(basket)}</strong>
                                            </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
            </div>
                    <h3>Payment Information</h3>

                    {
                        loading || clientToken === '' ? ( 
                        <div className='react_loader'>
                            <TailSpin
                                type='oval'
                                color = 'rgb(255, 72, 0)'
                                width = {50}
                                height = {50}
                            />
                        </div>
                         ) : (
                            <div className='card'>
                                <DropIn 
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: 'vault'
                                        }
                                    }}
                                    onInstance={instance => setData({instance: instance})}
                                 />
                            </div>
                            
                         ) 
                    }
                    {
                        processingOrder ? (
                            <div className='react_loader'>
                            <Oval
                                type='oval'
                                color = 'rgb(255, 72, 0)'
                                width = {40}
                                height = {40}
                            />
                        </div>
                        ) : (
                        
                            <div>
                                {
                                    loading ? (
                                        <>
                                        </>
                                    ) : (
                                       <button type='submit' >Buy</button>  
                                    )
                                }
                            </div>
                        )
                    }                       
                 </form>

                 
            </div>

            <div className='card_right'>
                <span className='min min2'> <h2>Checkout Detail </h2>{basket.length <= 3 ? ('') : ( !isOpen ? <ArrowDown onClick={handleOpen} /> : <ArrowUp onClick={handleOpen}  /> )}</span>

                {
                    basket.length  <= 3 ? (
                        <div>
                        <p>Your have <strong>{basket.length} </strong> product{'(s) '}in your cart</p>
                        {
                            basket.map((item, index) => {
                                return(
                                    <div className='card_right_product'>
                                            <div className='card_right_product_img'><img src={image} alt="" /> </div>
    
                                            <div className='card_right_product_details'>
                                                <span className='flex'>{ item.title}</span> 
    
                                                <span className='flex'><small>$</small><strong>{item.price} x {item.quantity}{' piece(s)'}</strong></span> 
    
                                                
                                            </div>
                                            
                                    </div>
                                )
                            })
                        }
                        <div className='total'>
                            <div>
                                Total Price <small>$</small><strong>{getBasketTotal(basket)}</strong>
                                </div>
                            <div>
                            </div>
                        </div>
                        </div>
                    ) : (
                        !isOpen &&
                        <div>
                            <p>Your have <strong>{basket.length} </strong> product{'(s) '}in your cart</p>
                            {
                                basket.map((item, index) => {
                                    return(
                                        <div className='card_right_product'>
                                                <div className='card_right_product_img'><img src={image} alt="" /> </div>
        
                                                <div className='card_right_product_details'>
                                                    <span className='flex'>{ item.title}</span> 
        
                                                    <span className='flex'><small>$</small><strong>{item.price} x {item.quantity} {' piece(s)'} </strong></span> 
        
                                                    
                                                </div>
                                                
                                        </div>
                                    )
                                })
                            }
                            <div className='total'>
                                <div>
                                    Total Price <small>$</small><strong>{getBasketTotal(basket)}</strong>
                                    </div>
                                <div>
                                <Button>Review</Button>   
                                </div>
                            </div>
                        </div>
                    )
                }
             
                   
                    
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    basket: state.cart.basket,
    user: state.auth.user
})
export default connect(mapStateToProps, {cart_detail})(Checkout);