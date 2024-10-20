import React from 'react';
import {connect} from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import '../Assets/css/Subtotal.css';
import { cart_detail } from '../Redux/Actions/cart';
import { getBasketTotal } from '../Redux/Actions/cart';
import { Link } from 'react-router-dom';

const Subtotal = ({basket}) => {
    return(
        <div className='subtotal'>
           <CurrencyFormat
            renderText={(value) => (
                <>
                    <p>
                       Your Cart Subtotal: ({basket.length} items):
                        <strong>{""}{value}</strong>
                    </p>
                    <small className='subtotal_gift'>
                        <input type="checkbox" />This order Contains gift.
                    </small>
                </>
            )} 

            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
           />
        
            <button className='go_to'>
                {
                    basket.length === 0 ?
                    <Link to="/">
                    Go to Shopping
                </Link>
                :
                <Link to="/checkout">
                    Go to checkout
                </Link>
                }
                
            </button>
        
        
        </div>
    )
}

const mapStateToProps = state => ({
    basket: state.cart.basket,
})
export default connect(mapStateToProps, {cart_detail}) (Subtotal);
