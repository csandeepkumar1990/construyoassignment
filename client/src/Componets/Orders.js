import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Tooltip, OverlayTrigger, Spinner } from 'react-bootstrap';
import { withFirebase } from "../Firebase";
import {getOrdersFromService} from '../services/orders.servics';
import moment from 'moment'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import Loader from "react-loader-spinner";

const styles={
  container: {
   width: '100%',
   padding: '20px'
  },
  spinner: {
    marginTop: '10%'
   },
}

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Click here to edit
  </Tooltip>
);

const LinearIndeterminate = () => {
  

  return (
    <div style={styles.spinner}>
      <Loader
        type="Oval"
        color="gray"
        height={80}
        width={80}
        timeout={3000} //3 secs
      />
    </div>
  );
};

const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true,
    cell: row => 
  <div data-tag="allowRowEvents">
    <div>
    <OverlayTrigger
    placement="right"
    overlay={renderTooltip}
  >
      <Link to={`orders/${row.docId}`}>{row.title}</Link>
      </OverlayTrigger>
    </div>
  </div>,
  },
  {
    name: "Booking Date",
    selector: "bookingDate",
    sortable: true
  },
  {
    name: "Address",
    selector: "street",
    sortable: true
  },
  {
    name: "Customer",
    selector: "customerName",
    sortable: true
  }
];

function Orders(props) {
  const [ordersData, setOrdersData] = useState([])
  const [pending, setPending] = React.useState(true);
  const rowClickHandler = (row) => {
    console.log('row', row)
  }

  const getOrders = async () => {
  let orders = await getOrdersFromService()
  console.log('orders', orders)
  orders.data.map((elem) =>{
    elem.bookingDate = moment(new Date(elem.bookingDate)).format("DD.MM.YYYY")
    elem.street =  (elem.address ? elem.address.street || 'N/A' : 'N/A' )
    elem.customerName = (elem.customer ? elem.customer.name || 'N/A' : 'N/A' )
  })
  setOrdersData(orders.data)
  setPending(false);
}

  useEffect(() => {
    getOrders()
  }, [])

  const conditionalRowStyles = [
    {
      when: row => row.calories < 300,
      style: {
        backgroundColor: 'green',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    }
  ];

  return (
    <>
    <div>
    <Navbar />
    <div style={styles.container}>
      <DataTable
          columns={columns}
          data={ordersData}
          pagination
          onRowClicked={rowClickHandler}
          conditionalRowStyles={conditionalRowStyles}
          progressPending={pending}
          progressComponent={<LinearIndeterminate />}
        />
        </div>
        </div>
    </>
  );
}

export default withFirebase(Orders)