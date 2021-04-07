import React, { useState } from 'react'
import {Formik} from "formik"
import * as Yup from "yup"
import { Button, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {withFirebase} from '../Firebase/index'


const styles={
   container: {
    width: '40%',
    padding: '20px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
   },
   loginBtn: {
     width: '110px',
     marginTop: '10px'
   }
}
 function Login(props) {  
    const validationSchema = Yup.object({
      email: Yup.string().email().required("email is required"),
      password: Yup.string().required("password is required")
    }) 
   
    return ( 
    <Formik 
       initialValues={{email: "" , password: ""}}
       validationSchema={validationSchema}
       onSubmit ={async(values) => {
        try {
          let result = await props.firebase.doSignInWithEmailAndPassword(values.email,values.password)
          console.log('result', result)
          if(result && result.user){
            props.history.push('/orders')
          }
        } catch (error) {
          console.log('error', error)
        }
      }}>
  
   {({handleSubmit,handleChange,values,errors, touched}) => (
     
         <div style={styles.container}>
           <h1 style={{color:"gray",marginBottom:"15px",fontFamily:"serif"}}>Construyo</h1>
          <Card style={{padding: '40px', borderColor: 'lightgray'}}>
            <Form onSubmit={handleSubmit} style={{marginTop: '10px'}}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{float: 'left'}}>Email address:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={values.email} onChange={handleChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label style={{float: 'left'}}>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange}/>
              </Form.Group>
              <Button variant="primary" type="submit" style={styles.loginBtn}>
                Login
              </Button>
            </Form>
          </Card>
          </div>
                
        )}
        </Formik>
       )}  

export default withFirebase(Login)