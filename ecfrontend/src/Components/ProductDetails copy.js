import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { cart_add} from '../Redux/Actions/cart';
import { cart_remove } from '../Redux/Actions/cart';
import Product from './Product';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../Assets/css/PDetails.css';
import image1 from '../Assets/css/static/precuct2.jpeg';
import image2 from '../Assets/css/static/product1.jpeg';
import image3 from '../Assets/css/static/eyeGlass.jpg';
import image4 from '../Assets/css/static/eyeGlass.jpg';
import { Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';



const ProductDetails = ({basket, cart_add, cart_remove}) => {

const {slug} = useParams()
let [indexes, setIndexes] = useState(0)
const [productDetails, setProductDetails] = useState({})
const [img, setImg] = useState([])
const [list, setList] = useState()

const cartItem = basket.find(item => item.id === productDetails.id);
    // Get the quantity of the product in the cart
const quantityInCart = cartItem ? cartItem.quantity : 0;
console.log(quantityInCart)
const [count, setCount] = useState(Number(quantityInCart))

const handleTabClick = (image) => {
    setIndexes(indexes = image)
}

let len = img.length - 1

const handleArrowClickPrev = () => {
 // for(i=0, i++, i>0){
 setIndexes(indexes <= 0 ? len : indexes - 1 )
}

console.log("len ", indexes)
const handleArrowClickNext = () => {
    // for(i=0, i++, i>0){
    setIndexes(indexes >= len ? 0 : indexes + 1 )
   }

   useEffect(() => {
    const fetchData = async () => {
        try{
           const res = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/shop/product/${slug}/`);
           if(res.status==200){
            setProductDetails(res.data)
           }else{
            console.log(res.error)
           }
        }catch(error){
            console.log(error)
        }
    }

    fetchData()
   },[])


useEffect(() => {
    axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/shop/product/${slug}/images/`)
    .then(res => {
        setImg(res.data)
        setList(res.data.map(item => item.images))
    }
    ).catch(error => {
        //error handling
    })

},[])

useEffect(() => {
    if(quantityInCart !== 0){
       setCount(quantityInCart)  
    }else{
        setCount(1)
    }
   
},[quantityInCart])

const {id, name, description, price, title, images} = productDetails;


const handleCartAdd = (quantity) => {

    try{
        cart_add(id, title, images, price, quantity, slug)
    }
    catch(error){
        //Hndle errors
    }
}

const handleRemoveFromCart = () => {
    try{
        cart_remove(id)
    }
    catch(error){
        //Handle errors
    }
}

const handleCountPlus = () => {
   setCount(count < 1 || count >= 20 ? 1 : count + 1) 
   }

   const handleCountMinus = () => {
    setCount(count <= 1 || count > 20 ? 20 : count - 1 ) 
    }
    return(
        <div className='detail_product'>
            <h3>Detail Product</h3>
            <div className='cont'>
                    <div className='details_left'>
                        <span className='arrow'>
                        <ArrowBackIosIcon onClick={handleArrowClickPrev} />
                        <ArrowForwardIosIcon onClick={handleArrowClickNext} />    
                        </span> 
                            
                            
                                {
                                    img?.map((image, index) => {
                                        return(
                                            <div key={index} className={ index==indexes ? 'image_flex active' : 'inactive'} >
                                                <img src={image.images} alt="" />
                                            </div>
                                        )
                                    })
                                }
                            
                             <div className='gallery2'>
                                    {
                                        img.map((image, index) => {
                                        return(
                                        <img key={index} className={index == indexes && 'border'}  onClick={() => handleTabClick(index)} src={image.images} alt="" />
                                        )})
                                    }       
                            </div>      
                    </div>
              
                <div className='details_right'>
         
                    <select>
                        <option>Select Color</option>
                        <option style={{color: 'red'}}>red</option>
                        <option style={{color: 'green'}}>green</option>
                        <option style={{color: 'grey'}}>white</option>
                    </select>
                
                            <h2>{name}</h2>
                            <div className='description'>
                                <p>{description}</p>
                            </div>
                            

                           <div className='quant' style={{display:"flex", flexFlow:'wrap row', width:'100%', justifyContent:'center'}}>
                                <span className='price1' style={{color: 'purple', fontWeight:'700', fontSize:'1.1rem'}}>Price: <small>$</small><strong>{price}</strong> </span>
                                <span className='price1' style={{color: 'green', fontWeight:'700', fontSize:'1.1rem'}}>Qty in cart: <strong>{quantityInCart}</strong></span>
                                <span className='price1' style={{color: 'orange', fontWeight:'700', fontSize:'1.1rem'}}>Updating Qty: <strong>{count}</strong></span>
                            </div> 

           
                    <div className='gallery'> 

                
                        {
                            img?.map((image, index) => {
                                return( 
                                <img  className={index == indexes && 'border'} key={index} onClick={() => handleTabClick(index)} src={image.images} alt="" />
                                 )
                            })
                        }

                               
                            
                
                   
        
                    </div>
                    <div className='buttons' style={{display:"flex", flexFlow:'wrap row', width:'100%', 'justifyContent':'center'}}>
                        <div className='quantity'>
                            <span onClick={handleCountMinus} className='minus'><ArrowBackIos /></span>
                            <span className='field'>{count}</span>
                            <span onClick={handleCountPlus} className='plus'><ArrowForwardIosIcon /></span>
                        </div> 
                        
                        {
                            quantityInCart !== 0 && count !== quantityInCart? 
                              <div>
                                <Button onClick={() => { handleCartAdd(count)}}>{count + 1 && count !== quantityInCart && quantityInCart !== 0 && 'Update'}</Button> 
                            </div>
                        :
                            <div>
                                <Button onClick={() => { handleCartAdd(count)}}>{'Add'}</Button> 
                            </div>
                        }
                        {
                            quantityInCart !== 0 ?
                            <div>
                            <Button style={{background: 'red'}} onClick={handleRemoveFromCart}>Remove</Button>     
                            </div>
                        : ''                    
                    }


                        <div>
                          <Button>
                            <Link to='/details' style={{color:'white', textDecoration:'none'}}>Checkout</Link>
                            </Button>     
                        </div>
                    </div>  
                 
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    basket: state.cart.basket
})

export default connect(mapStateToProps, {cart_add, cart_remove})(ProductDetails);