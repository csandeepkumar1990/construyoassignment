import React, {component, useEffect, useState} from 'react'
import './App.css';
import Login from './Componets/Login'
import Orders from './Componets/Orders'
import {  Route, Switch, withRouter} from 'react-router-dom';
import { withFirebase } from './Firebase';
import { compose } from 'recompose';
import OrderEdit from './Componets/OrderEdit';

function App(props) {
  useEffect(() => {
    let subscribe = props.firebase.onAuthUserListener(
      authUser => {
        console.log('authUser app =>>>>',authUser)
        // props.history.push('/orders')
      },
      () => {
        props.history.push('/')
      }
    )
  }, [])

  return (
    <div className="App">
       
       <Switch>
         <Route path="/" component={Login} exact />
       <Route path="/orders/:id" component={OrderEdit} exact />
       <Route path="/orders" component={Orders} exact/>
       </Switch> 
 </div>
  );
}

export default compose(
  withRouter,
  withFirebase,
)(App);

