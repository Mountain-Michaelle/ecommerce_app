import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import '../../Assets/css/Header.css';
import Name from '../../Assets/css/static/BrandName.png';
import CART from '../../Assets/css/static/CART.png';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {cart_add} from '../../Redux/Actions/cart';
import Search from './Search';

function Header({basket, isAuthenticated, user}) {


    useEffect(() => {
    },[basket])

    const handleFirstName = (name) => {
        var nam = name?.name.split(" ")
        return user && nam[0]
    }

  return (
    <div className='header'>
        <div className='logo'>
           <Link to="/"><img src={Name} alt='' /></Link> 
        </div>  
      

        <div className='header2'>
               <Search />   
              <div className='header_nav1'>
                    <div className='cart_num'><h2>{basket?.length}</h2></div>
                     <Link to="/details" ><img src={CART} alt="" /></Link> 
                </div> 
            <div className='header_navs'>
                <div className='header_nav'>
                    <span className='header_nav_option'>
                        Hello{" "}
                        {
                            handleFirstName(user)
                        }
                    </span>
    
                    <span style={{cursor:'pointer'}}>
                        {
                            isAuthenticated ?
                            <AccountCircleIcon />
                            :
                            <Link style={{color:'inherit'}} to='/login'>
                                Sign In 
                            </Link> 
                        }
                        
                    </span> 
                </div>

                <div className='header_nav'>
                    <span className='header_nav_option'>
                        Returns
                    </span>
                    <span>
                        Orders
                    </span>
                </div>

                <div className='header_nav' >
                    <span className='header_nav_option'>
                        For You
                    </span>
                    <span>
                        Prime
                    </span>
                </div>
               
            </div>
           
        </div>
    </div>
  )
}
const mapStateToProps = state => ({
    basket: state.cart.basket,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})
export default connect(mapStateToProps, {cart_add})(Header)