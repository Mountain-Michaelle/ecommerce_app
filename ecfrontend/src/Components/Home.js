import React, { lazy, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import onineshop from '../Assets/css/static/onlineshop.webp'
import '../Assets/css/Home.css';
import Product from './Product';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { server_time } from '../Redux/Actions/cart';
import { cart_time } from '../Redux/Actions/cart';
import {RotatingLines} from 'react-loader-spinner';
import { Box } from '@mui/material';
import Search2 from './Nav/Search2';

const Home = ({server_time, serverTime, cart_expiration}) => {

  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        try{
          const res = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/shop/products/`)
          if(res.status==200){
            setProduct(res?.data)
            setLoading(false)
          }
          else{
            console.log(res.error)
            setLoading(false)
          }
        }catch(error){
          //
        }
      }

      fetchData()
  },[])


  useEffect(() => {
    server_time()
  },[])

// Ensure product is always an array before using .filter
const featured = Array.isArray(product) && product.length !== 0
  ? product.filter(prod => prod.featured).slice(0, 2)
  : [];

const suggested = Array.isArray(product) && product.length !== 0
  ? product.filter(prod => prod.suggested).slice(0, 2)
  : [];

const most_popular = Array.isArray(product) && product.length !== 0
  ? product.filter(prod => prod.most_popular).slice(0, 3)
  : [];


  return (
    <div className='home'> 
        <img src={onineshop} alt='' />
        <div className='mobile-search'>
          <Search2 />
        </div>
        <div className='container'>

        
          <div className='row'><h2>Most Popular</h2></div>
          <div className='product_option'>
            {
              loading ?

                <Box sx={{display:'flex', justifyContent:'center', margin:'0 auto'}}>
                  <RotatingLines
                   visible={true}
                   height="100"
                   width="100"
                   position='center'
                   ariaLabel="color-ring-loading"
                   wrapperStyle={{}}
                   wrapperClass="color-ring-wrapper"
                   colors='white'
                   strokeColor='rgb(225, 98, 0)' />
                </Box>
              :
              most_popular?.map(item => {
                return(
                  <Product id={item.id} title={item.name} price={item.price} excerpt={item.excerpt} rating={4} image={item.images} 
                  description={item.excerpt} slug={item.slug}
                  />
                )
              })
            }
          </div>
              <div className='row'><h2>Featured Products</h2></div>
              <div className='product_option'>
                {
                   loading ?
                   <Box sx={{display:'flex', justifyContent:'center', margin:'0 auto'}}>
                     <RotatingLines
                      visible={true}
                      height="100"
                      width="100"
                      position='center'
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors='white'
                      strokeColor='rgb(225, 98, 0)' />
                   </Box>
                 :
                 featured?.map(suggest => {
                    return(
                       <Product  id={suggest.id} slug={suggest.slug} title={suggest.name} price={suggest.price} rating={5} description={suggest.excerpt} image={suggest.images}/>
                    )
                  })
                }
              
              </div>

              <div className='row'><h2>Suggested for you</h2></div>
              <div className='product_option'>
              {
                 loading ?

                 <Box sx={{display:'flex', justifyContent:'center', margin:'0 auto'}}>
                   <RotatingLines
                    visible={true}
                    height="100"
                    width="100"
                    position='center'
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors='white'
                    strokeColor='rgb(225, 98, 0)' />
                 </Box>
               :
               suggested?.map(suggest => {
                    return(
                       <Product  id={suggest.id} slug={suggest.slug} title={suggest.name} price={suggest.price} rating={5} description={suggest.excerpt} image={suggest.images}/>
                    )
                  })
                }
            </div>
        </div>
    </div>
  )
}
const mapStateToProps = state => ({
  cart_expiration: state.cart.cart_expiration,
  serverTime : state.cart.serverTime,
  server_time_now: state.cart.server_time_now,
})

export default connect(mapStateToProps, {server_time, cart_time})(Home);