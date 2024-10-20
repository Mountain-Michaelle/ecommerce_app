import React from 'react'
import { connect } from 'react-redux';
import '../Assets/css/ProductDetails.css';
import image from '../Assets/css/static/onlineshop1.webp'
import Subtotal from './Subtotal';
import { cart_detail } from '../Redux/Actions/cart';
import CheckOutProduct from './CheckOutProduct';

const CartDetails = ({basket}) => {
  return (
    <div className='product_details'>
        <img src={image} alt="" />
        
        <Subtotal/>

        <div className='subtotal_one'>
           <div className='detail_left'>
            {
                basket.length !== 0  ?
                 <h3>Your Shopping Basket</h3> :
                 <h3 style={{color: 'red', fontSize:'1.3rem'}}>Your shopping Cart is empty</h3>
            }
             </div>
          
            {
                basket.map((item, index) => {
                    return(
                         <div className='modify'> 
                            <CheckOutProduct id={item.id} price={item.price}
                            title={item.title} description={item.description} rating={item.rating} image={item.image} slug={item.slug} />
                         </div>
                    )
                })
            }
            
     

        </div>
          
       
    </div>
  )
}
const mapStateToProps = state => ({
    basket: state.cart.basket,
})
export default connect(mapStateToProps, {cart_detail})(CartDetails)