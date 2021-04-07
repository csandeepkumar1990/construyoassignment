import React, { useEffect, useState } from 'react'
import { withFirebase } from "../Firebase";
import { Formik } from "formik"
import { Button, Form, Card, Jumbotron, Container, Nav } from 'react-bootstrap';
import { getOrderwithId, updateOrderFromService, deleteOrderFromService } from '../services/orders.servics';
import moment from 'moment'
import Navbar from './Navbar'
import Swal from 'sweetalert2'
import Loader from "react-loader-spinner";


const styles = {
    container: {
        width: '40%',
        padding: '20px',
        position: 'absolute',
        top: '25%',
        transform: 'translate(0,-25%)'
    },
    spinner: {
        marginTop: '18%'
       },
    button: {
        width: '110px',
        marginTop: '10px'
    }
}
const OrderEdit = (props) => {

    const [data, setData] = useState({ title: "", bookingDate: "", address: "", customer: "", docId: "" })
    const [pending, setPending] = React.useState(true);

    const getOrderDetails = async () => {
        let response = await getOrderwithId(props.match.params.id)

        let orderData = response.data
        orderData.bookingDate = moment(new Date(orderData.bookingDate)).format("DD.MM.YYYY")
        orderData.address = (orderData.address ? `${orderData.address.street}, ${orderData.address.city}, ${orderData.address.zip}, ${orderData.address.country} ` || 'N/A' : 'N/A')
        orderData.customer = (orderData.customer ? `${orderData.customer.name}, ${orderData.customer.email}, ${orderData.customer.phone}` || 'N/A' : 'N/A')
        setData(orderData)
        setPending(false)     
    }

    const deleteHandler = async(docId) => {
        setPending(true)
        let response = await deleteOrderFromService(docId)
        if(response.data.code == 200) {
            Swal.fire('Order deleted successfully!')
            setPending(false)     
            props.history.push('/orders')
        }
        
    }

    const updateOrder = async(values) => {   
        if(new Date(values.bookingDate) == "Invalid Date"){
            Swal.fire('The booking date is invalid! Accepted date format MM.DD.YYYY')
            return
        }
        setPending(true)
        let toUpdate = {
            title: values.title,
            bookingDate: moment(new Date(values.bookingDate)).format("MM.DD.YYYY")
        }
        let response = await updateOrderFromService(values.docId, toUpdate)
        if(response.data.success){
            let update = {...data}
            update.bookingDate = moment(new Date(response.data.data.bookingDate)).format("MM.DD.YYYY")
            update.title = response.data.data.title
            Swal.fire('Order updated successfully!')
            setData(update)   
            setPending(false)     
        } else{
            setPending(false)     
        }
    }

    useEffect(() => {
        getOrderDetails()
    }, [])

    return (
        <div>
        <Navbar />
        {pending ?   <div style={styles.spinner}>
      <Loader
        type="Oval"
        color="gray"
        height={80}
        width={80}

      /> 
    </div> : 
        <Formik
            enableReinitialize
            initialValues={data}
            onSubmit={async (values) => {
                updateOrder(values)
    
            }}>

            {({ handleSubmit, handleChange, values, errors, touched }) => (

                <div style={styles.container}>
                    <Card style={{ padding: '40px', borderColor: 'lightgray' }}>
                        <Form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label style={{ float: 'left' }}>Title:</Form.Label>
                                <Form.Control type="text" placeholder="Title" name="title" value={values.title} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicBookingDate">
                                <Form.Label style={{ float: 'left' }}>Booking Date:</Form.Label>
                                <Form.Control type="text" placeholder="Booking Date" name="bookingDate" value={values.bookingDate} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicAddress">
                                <Form.Label style={{ float: 'left' }}>Address:</Form.Label>
                                <Form.Control type="text" placeholder="Address" name="address" value={values.address} readOnly />
                            </Form.Group>

                            <Form.Group controlId="formBasicCustomer">
                                <Form.Label style={{ float: 'left' }}>Customer</Form.Label>
                                <Form.Control type="text" placeholder="Customer" name="customer" value={values.customer} readOnly />
                            </Form.Group>
                            <span style={{display: 'flex', justifyContent: 'space-around'}}>
                            <Button variant="secondary" type="button" style={styles.button} onClick={() => props.history.push('/orders')}>
                                Go Back
                            </Button>
                           
                            <Button variant="primary" type="submit" style={styles.button}>
                                Update
                            </Button>

                            <Button variant="danger" type="button" onClick={()=>deleteHandler(values.docId)} style={styles.button}>
                                Delete
                            </Button>
                            </span>
                            
                        </Form>
                    </Card>
                </div>
            )}
        </Formik>
        }
        </div>
    )
}

export default withFirebase(OrderEdit)