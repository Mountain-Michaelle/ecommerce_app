import React, { useEffect, useState } from 'react'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import '../../Assets/css/EnshrinePops.css';

export const EPopups = ({title, message, navigate, type, duration, link, position }) => {

    const [display, setDisplay] = useState('')
    useEffect(() => {        
        if (type){
            const timer = setTimeout(() => {
                navigate(`${link}`)
                setDisplay('')
            }, duration);

            return () => clearTimeout(timer);
        }else{
            const timer = setTimeout(() => {
          setDisplay('off')
            },0);
            return () => clearTimeout(timer);
        }
    },[type, navigate])
  return (
    <div className={`epopup ${display}  ${position ? position : 'top-right'}`}>
        {
            type ? (
                <div className='icon_success'>
                    <CheckCircleOutlinedIcon />
                </div>
            ) : (
                <div className='icon_fail'>
                <ErrorOutlinedIcon />
                </div>
            )
        }
        <div className='content'>
        <span className='title'>{title}</span>
        <p>{message}</p>
        </div>
    </div>
  )
}
