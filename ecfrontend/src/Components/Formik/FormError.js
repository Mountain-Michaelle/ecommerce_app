import React from 'react'

function FormError(props) {
  return (
    <div className='errors'>
        {props.children}
    </div>
  )
}

export default FormError