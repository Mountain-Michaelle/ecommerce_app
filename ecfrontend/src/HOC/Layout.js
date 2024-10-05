import React, { useEffect } from 'react'
import Header from '../Components/Nav/Header'
import { connect } from 'react-redux';
import { checkAuthentiated } from '../Redux/Actions/auth';

function Layout(props) {
  useEffect(() => {
    props.checkAuthentiated()
  },[])

  return (
    <div>
        <Header />
        {props.children}
    </div>
  )
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(null, {checkAuthentiated})(Layout);