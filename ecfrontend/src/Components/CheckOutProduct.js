import React from "react";
import { connect } from "react-redux";
import StarRateIcon from '@mui/icons-material/StarRate';
import '../Assets/css/CheckOutProduct.css';
import { cart_detail, cart_remove } from "../Redux/Actions/cart";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const CheckOutProduct = ({ cart_remove, id, title, rating, description, price, image, slug}) => {
    const handleProductRemove = () => {
        cart_remove(id)
    }
    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <h3 style={{color: 'grey'}}>{title}</h3>
           <div className="checkout_product"  style={{overflow:'hidden'}}>
            <img src={image} alt="" />

            <div className="info1">
                
                <p className="desc">{description}</p>

                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

                <i className="checkout_product_rating">
                    {
                        Array(rating).fill().map((_, i) => (
                            <p>
                                <StarRateIcon />
                            </p>
                        ))
                    }
                </i>
                <Box sx={{display: "flex", flexFlow:'wrap row', alignItems:'center', justifyContent:'center', gap:'0.5rem', margin: '0', padding: '0'}}>
                    <button onClick={handleProductRemove}>Remove</button>
                    <button><Link style={{color:'green', textDecoration:'none'}} to={`/product/${slug}/details`}>Update</Link></button> 
                </Box>
           
            </div>
        </div> 
        </div>
        
    )
}
const mapStateToProps = state => ({
    basket: state.cart.basket
})
export default connect(mapStateToProps, {cart_remove})(CheckOutProduct);