import React from 'react'
import '../../Assets/css/Formik.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function YoutubeForm() {

    const formik = useFormik({
        // Managing the form state
         initialValues: {
            name: 'Michael',
            email: '',
            channel: '',
         },
         // Form submission with formik
         onSubmit: values => {
          console.log("On submit ", values)
         },

         // Form validation
        //  validate: values => {
        //     let errors = {}
            
        //     if(!values.name){
        //         errors.name = 'Please provide your name'
        //     }

        //     if(!values.email){
        //         errors.email = 'Please provide your email'
        //     } else if(!/^[A-Z0-9._&+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        //         errors.email = 'Invalid email format'
        //     }

        //     if(!values.channel){
        //         errors.channel = 'Please provide your channel'
        //     }

        //     return errors
        //  },

        validationSchema: Yup.object({
            name: Yup.string().required('Please provide your name, yup'),
            email: Yup.string().email('Invalid email format').required('Please provide your email yup'),
            channel: Yup.string().required("Please provide your channel yup")
        })
    })

    console.log("Visited Fields ", formik.touched)

  return (
    <div className='youtube'>
        <form className='formik' onSubmit={formik.handleSubmit}>
          <label>Name</label>
        <input type='text' name='name' id='name' placeholder='name'  
        {
          ...formik.getFieldProps('name')
        }
       />
        {
           formik.touched.name && formik.errors ? <div className='errors'>{formik.errors?.name}</div> : ''
        }

        <label>email</label>
        <input type='email' name='email' id='email' placeholder='email' 
         {
          ...formik.getFieldProps('email')
         }
          />
        {
           formik.touched.email && formik.errors ? <div className='errors'>{formik.errors?.email}</div> : ''
        }

        <label>Channel</label>
        <input type='text' name='channel' id='channel' placeholder='channel link' 
         {
          ...formik.getFieldProps('channel')
         }
         /> 
        {
           formik.touched.channel && formik.errors ? <div className='errors'>{formik.errors?.channel}</div> : ''
        }
        <button type='submit'>Submit</button>   
        </form>
      
    </div>
  )
}

export default YoutubeForm