import React, { useEffect, useState } from 'react';
import BrandName from '../../Assets/css/static/BrandName.png'
import '../../Assets/css/UsersRegistration.css';
import { Radio } from 'react-loader-spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { sign_up } from '../../Redux/Actions/auth';
import Drawer from '@mui/material/Drawer'
import {connect} from 'react-redux';

const UsersRegistration = ({sign_up, loading, success, f_error}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const  phone = '12345678910'

    const initialValues = {
        name: '',
        email: '',
        password: '',
        re_password: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("First name required"),
        email: Yup.string().email('Email not valid').required("Email field is required"),
        password: Yup.string().required('Password field required').min(8, "Password must be at least 8 character"),
        re_password: Yup.string().required("Confirm password field required").oneOf([Yup.ref('password'), null,], 'Passwords do not match')
    })

    const formik = useFormik({
        initialValues,
        validationSchema,

        onSubmit: async values => {
            const {name, email, password, re_password} = values
            sign_up(name, email, phone, password, re_password)
        }
    })

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleError = (error) => {
        return(
            <p className='form-error'>{error}</p>
        )
    }

    useEffect(() => {
        if(f_error.error === "Account email already exists"){
               setError(f_error.error) 
           }else{
               setError('')
           }
       },[f_error])
    
       
useEffect(() => {
    if(success.success !== 'Account created successfully!'){
       navigate('') 
    } 
    else if(f_error.error){
    navigate('')
    }
    else if(success.success === "Account created successfully!"){
        navigate('/login')
    }
},[success])

console.log(f_error.error === "Account email already exists", "Check well")
    return (
        <div classNam="users_registation">
            <div className='users_registation1'>
                <img src={BrandName} alt='enshrine world' />
            </div>

            <div className='users_registation2'>
                <span className='spans'>
                <h3>Create Enshrine Account</h3>
                </span>
                
                {
                    handleError(error)
                }
                <form onSubmit={formik.handleSubmit} className='form'>
                <div className='labelled_input'>
                    <label htmlFor='name'>First Name</label>
                    <input autoFocus={true} onChange={formik.handleChange} {...formik.getFieldProps('name')} type='text' placeholder='' />
                </div>

                    {
                        formik.errors.name && formik.touched.name ? handleError(formik.errors.name) : ''
                    }

                <div className='labelled_input'>
                    <label htmlFor='email'>Email</label>
                    <input onChange={formik.handleChange} {...formik.getFieldProps('email')}  type='email' placeholder='' />
                </div>
                    {
                        formik.errors.email && formik.touched.email ? handleError(formik.errors.email) : ''
                    }
                <div className='labelled_input'>
                    <label htmlFor='password'>Password</label>
                    <input onChange={formik.handleChange} {...formik.getFieldProps('password')}  type={showPassword ? 'text' : 'password'} placeholder='' />
                    <span onClick={handleShowPassword} className='eye'>
                        {
                            showPassword ? 'hide' : 'show'
                        }
                    </span>
                </div>

                    {
                        formik.errors.password && formik.touched.password ? handleError(formik.errors.password) : ''
                    }   

                    <div className='labelled_input'>
                    <label htmlFor='re_password'>Confirm Password</label>
                    <input onChange={formik.handleChange} {...formik.getFieldProps('re_password')}  type={showPassword ? 'text' : 'password'} placeholder='' />
                    <span onClick={handleShowPassword} className='eye'>
                        {
                            showPassword ? 'hide' : 'show'
                        }
                    </span>
                    </div>

                        {
                            formik.errors.re_password && formik.touched.re_password ? handleError(formik.errors.re_password) : ''
                        }   
                    <div className='radio_button'>
                        <input type='radio' />
                        <span className='update'>Recieve updates on changes in products and account managements

                        </span>
                    </div>
                <div className='register_button'>
                   <button type="submit">{loading ? 'processing...' : 'Register'}</button>  
                </div>
               
                </form>
                
                <p class='already-reg'> Already registered? <Link to='/login'>login</Link></p>
            </div>
        </div>
    )
}

const mapStateToprops = (state) => ({
    success: state.auth.success,
    loading: state.auth.loading,
    f_error: state.auth.f_error,
})

export default connect(mapStateToprops, {sign_up})(UsersRegistration);