import React from 'react'
import '../../Assets/css/Formik.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import FormError from './FormError';

function FormikComponent() {

    const initialValues = {
        name: 'Michael',
        email: '',
        channel: '',
        Comment: '',
        Address: '',
        }

    const validationSchema = 
        Yup.object({
                name: Yup.string().required('Please provide your name'),
                email: Yup.string().email('Invalid email format').required('Please provide your email'),
                channel: Yup.string().required("Please provide your channel"),
                address: Yup.string().required("Please provide your address")
            })
    
    const onSubmit = values => {
        console.log("On submit ", values)
       }

  return (
    <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
    >
        <div className='youtube'>
            <Form className='formik'>
            <label>Name</label>
            <Field type='text' name='name' id='name' placeholder='name' />
            <ErrorMessage  className='errors' name='name'  component={FormError} />

            <label>email</label>
            <Field type='email' name='email' id='email' placeholder='email' />
            <ErrorMessage className='errors' component={FormError} name='email' />

            <label>Channel</label>
            <Field type='text' name='channel' id='channel' placeholder='channel link' /> 
            <ErrorMessage className='errors'  component={FormError} name="channel" />

            <label htmlFor='comment'>Comment</label>
            <Field as='textarea' name='comment' id='comment' />

            <label>Address</label>
            <Field name='address'>
                {
                    (props) => {
                        console.log("Props ", props)
                        const {field, form, meta} = props
                        return(
                            <>
                            <input type='text'  name="address" id='address'  {... field}/>
                            {
                                meta.touched || meta.error ? <div style={{color: 'red'}}>{meta.error}</div> : null
                            }
                            </>
                        )
                    }
                }
            </Field>

            <button type='submit'>Submit</button>   
            </Form>
        
        </div>  
    </Formik>
    
  )
}

export default FormikComponent
