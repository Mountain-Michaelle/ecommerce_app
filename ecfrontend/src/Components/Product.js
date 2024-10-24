import React, { useState } from "react";
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


const Product = ({cart_add, cart_time, server_time, productImgs, id, title, rating, description, image, price, slug, excerpt}) => {
    const quantity = 1;
    let [indexes, setIndexes] = useState(0)

    // let len = productImgs ? productImgs?.length - 1 : []

    let len = Array.isArray(productImgs) && productImgs.length !== 0
  ? productImgs?.length - 1
  : [];

    const handleArrowClickNext = () => {
        // for(i=0, i++, i>0){
        setIndexes(indexes >= len ? 0 : indexes + 1 )
       }
    
    const handleArrowClickPrev = () => {
    // for(i=0, i++, i>0){
    setIndexes(indexes <= 0 ? len : indexes - 1 )
    }
    
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
    console.log("indexes are ", indexes)

    return(
        <div className="product">
            <div className="details">
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
                            <StarRateIcon  key={i}/>
                        ))}
                    </div>

            </div> 
            <div className="arrows">
                    <div className="arrowb"> <ArrowBackIosIcon onClick={handleArrowClickPrev} /></div>
                    <div className="arrowf"> <ArrowForwardIosIcon onClick={handleArrowClickNext} /></div>
            </div>
            
            <div className="img_container">
                <Link to={`/product/${slug}/details`} >
                    {
                    productImgs?.length === 0 ?
                        <img src={image} alt="" /> :
                        productImgs?.map((Img, index) => {
                            return(
                                <div className={ index==indexes ? 'imgs2 active' : 'inactive'}>
                                <img key={index} src={Img.images} alt="" />   
                                </div>
                            )
                        })
                    }
                </Link>
                
            </div>
            
            <button onClick={handleAddToBasket}>Add to cart</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    basket: state.cart.basket
})
export default connect(mapStateToProps, {cart_add, cart_time, server_time})(Product);