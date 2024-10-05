import React from "react";
import '../Assets/css/Product.css';
import Product1 from '../Assets/css/static/product1.jpeg';
import StarRateIcon from '@mui/icons-material/StarRate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import { cart_add } from "../Redux/Actions/cart";
import { cart_time } from "../Redux/Actions/cart";
import { server_time } from "../Redux/Actions/cart";


const Product = ({cart_add, cart_time, server_time, basket, id, title, rating, description, image, price, slug, excerpt}) => {
    const quantity = 1;

    const handleAddToBasket = () => {
    try{
        cart_add(id, title, image, price, quantity, slug) 
        cart_time()
        server_time()
    }
    catch(error){
        console.log("---")
    }
    }

    return(
        <div className="product">
            <div className="info">
            <p>{description}...</p>
            </div>
            <div className="title">
            <Link to={`/product/${slug}/details`}><h3>{title}</h3></Link>
            </div>
            <div className="price">
                <h3><strong style={{color:"brown"}}>Price:</strong> {" "}{price}$</h3>
                </div>

            <div className="rating">
                {Array(rating).fill().map((_, i) => (
                    <StarRateIcon />
                ))}
            </div>
            <div className="arrows">
                <div className="arrowb"> <ArrowBackIosIcon /></div>
                <div className="arrowf"> <ArrowForwardIosIcon /></div>
            </div>
            

            <Link to={`/product/${slug}/details`} ><img src={image} alt="" /></Link>

            <button onClick={handleAddToBasket}>Add to cart</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    basket: state.cart.basket
})
export default connect(mapStateToProps, {cart_add, cart_time, server_time})(Product);