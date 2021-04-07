import React from 'react'
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { withFirebase } from "../Firebase";

function Navbarr(props) {

    const logOut = async() => {
        props.firebase.doSignOut()
      }
    return (
        <div>
             <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/">Construyo</Navbar.Brand>
              <Nav className="mr-auto">
              </Nav>
              <Form inline>
                <Button variant="outline-info" onClick={logOut}>Logout</Button>
              </Form>
            </Navbar>
        </div>
    )
}


export default withFirebase(Navbarr)