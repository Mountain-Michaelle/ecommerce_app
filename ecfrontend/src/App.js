import './App.css';
import {Provider} from 'react-redux';
import Header from './Components/Nav/Header';
import Logo from './Assets/css/static/CART.png';
import Name from './Assets/css/static/BrandName.png';
import Home from './Components/Home';
import { Routes, Route } from 'react-router-dom';
import Layout from './HOC/Layout';
import store from './store';


import CartDetails from './Components/CartDetails';
import ProductDetails from './Components/ProductDetails';
import CheckOutProduct from './Components/CheckOutProduct';
import Checkout from './Components/Checkout';
import YoutubeForm from './Components/Formik/YoutubeForm';
import FormikComponent from './Components/Formik/FormikComponent';
import UsersRegistration from './Components/Auth/UsersRegistration';
import Login from './Components/Auth/Login';


function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <Layout>
          <Routes> 
            <Route path='/' element={<Home />} />
            <Route path='/details' element={<CartDetails />} />
            <Route path='/product/:slug/details' element={<ProductDetails />} />
            <Route path='/checkout' element={<Checkout />} />


            {/** Formiks components */}
            <Route path='/formik' element={<FormikComponent /> } />

            {/** Authentication components */}
            <Route path='/register' element={<UsersRegistration />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Layout>
      </div>
    </Provider>
    
  );
}
export default App;
