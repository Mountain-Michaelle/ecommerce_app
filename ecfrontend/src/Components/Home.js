import React, { lazy, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import onineshop from '../Assets/css/static/onlineshop.webp'
import '../Assets/css/Home.css';
import Product from './Product';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { product, product_details} from '../Redux/Actions/product';
import {RotatingLines} from 'react-loader-spinner';
import { Box } from '@mui/material';
import Search2 from './Nav/Search2';

const Home = ({products, prod_img, status, loading, product}) => {

  useEffect(() => {
    if(products.length === 0 & status === 'idle'){
     product()
    }
  },[products])

// Ensure product is always an array before using .filter
const featured = Array.isArray(products) && products.length !== 0
  ? products.filter(prod => prod.featured).slice(0, 2)
  : [];

const suggested = Array.isArray(products) && products.length !== 0
  ? products.filter(prod => prod.suggested).slice(0, 2)
  : [];

const most_popular = Array.isArray(products) && products.length !== 0
  ? products.filter(prod => prod.most_popular).slice(0, 3)
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
              most_popular?.map((item, index) => {
                return(
                  <Product key={index} id={item.id} title={item.name} price={item.price} excerpt={item.excerpt} rating={4} image={item.images} 
                  description={item.excerpt} slug={item.slug} productImgs={item.product_image}
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
                 featured?.map((suggest, index) => {
                    return(
                       <Product key={index}  id={suggest.id} slug={suggest.slug} title={suggest.name} price={suggest.price} rating={5} 
                       description={suggest.excerpt} image={suggest.images} productImgs={suggest.product_image} />
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
               suggested?.map((suggest, index) => {
                    return(
                       <Product key={index}  id={suggest.id} slug={suggest.slug} title={suggest.name} price={suggest.price} rating={5} 
                       description={suggest.excerpt} image={suggest.images} productImgs={suggest.product_image} />
                    )
                  })
                }
            </div>
        </div>
    </div>
  )
}
const mapStateToProps = state => ({
  products: state.product.products,
  status: state.product.status,
  loading: state.product.loading,
  prod_img: state.product.prod_img,
})

export default connect(mapStateToProps, {product})(Home);