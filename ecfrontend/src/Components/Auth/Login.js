import React, {useEffect, useState} from 'react'
import BrandName from '../../Assets/css/static/BrandName.png'
import '../../Assets/css/UsersRegistration.css';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../Redux/Actions/auth';
import * as Yup from 'yup';
import { useFormik } from 'formik';


const Login = ({loading, login, error, isAuthenticated}) => {
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required('Password is required')
})

    const formik = useFormik({
        initialValues,
        validationSchema,

        onSubmit: async values => {
            const {email, password} = values
            login(email, password)
        }
    })


    const handleError = (error) => {
        return(
            <p className='form-error'>{error}</p>
        )
    }

    useEffect(() => {
        if(error === 'No active account found with the given credentials' && !loading){
            setMessage("Invalid email or password")
        }else{
            setMessage("")
        }
    },[error])

    useEffect(() => {
        if(isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated])

  return (
    <div classNam="users_registation">
        <div className='users_registation1'>
            <img src={BrandName} alt='enshrine world' />
        </div>

        <div className='users_registation2'>
            <span className='spans'>
            <h3>Account Login</h3>
            </span>
            
            {
                handleError(message)
            }
            <form onSubmit={formik.handleSubmit} className='form'>

            <div className='labelled_input'>
                <label htmlFor='email'>Email</label>
                <input autoFocus={true} onChange={formik.handleChange} {...formik.getFieldProps('email')} type='email' placeholder='' />
            </div>
            {
                formik.errors.email && formik.touched.email ? handleError(formik.errors.email) : ''
            }
            <div className='labelled_input'>
                <label htmlFor='password'>Password</label>
                <input onChange={formik.handleChange} {...formik.getFieldProps('password')} type='password' placeholder='' />
            </div>

            {
                formik.errors.password && formik.touched.password ? handleError(formik.errors.password) : ''
            }

            <div className='register_button' type='submit'>
                <button>{ loading ? 'processing...': 'Sign in'}</button>  
            </div>
            
            </form>
            
            <p class='already-reg'> Don't have an account?<Link to='/register'> Register</Link></p>
        </div>
    </div>
        )
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,

})

export default connect(mapStateToProps, {login})(Login);