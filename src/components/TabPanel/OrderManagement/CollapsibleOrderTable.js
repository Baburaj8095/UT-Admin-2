import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import moment from 'moment';
import { reactLocalStorage } from 'reactjs-localstorage';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles({
  paper: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



//inner table, using the props tableData passed from the OrderManagement.js
function Row(props) {

  const classes2 = useStyles();


  const { row } = props; //outer table data


  //storing the order_id in a local storage
  const handleOrderClick =(id) =>{
      reactLocalStorage.set("order_id", id);
      console.log("order_id from the loalStorage: ",reactLocalStorage.get("order_id"));
  }


  return (
    <React.Fragment>
      <TableRow className={classes2.paper}>
              <TableCell component="th" scope="row"> <NavLink to="/order-details" style={{textDecoration:'none'}} onClick={(order_id)=>handleOrderClick(row.id)}> { row.id }</NavLink></TableCell>
              <TableCell cocomponent="th">{moment(row.placedDate).format('DD-MM-YYYY, hh:mm A')}</TableCell>
              <TableCell cocomponent="th">{row.status}</TableCell>
              <TableCell cocomponent="th">{row.customer.firstName}</TableCell>
              <TableCell cocomponent="th">{ moment(row.deliveryInfo.slotStart).format('DD-MM-YYYY, hh:mm A')} - { moment(row.deliveryInfo.slotEnd).format('DD-MM-YYYY, hh:mm A')}</TableCell>
      </TableRow>
       
      
    </React.Fragment>
  );
}




const CollapsibleOrderTable = (props)=> {

  const data = props.tableData; //data passed as props in OrderManagement.js
  reactLocalStorage.set('table_data_length', data.length);
  const classes2 = useStyles();


  return (
    <Paper className={classes2.paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{backgroundColor:'#E6E6FA', textAlign:'center'}}>
            <TableCell style={{fontSize:'17px'}}>Order ID</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Order Date</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Status</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Customer Name</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Delivery Slot</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
        
      </Table>
    </Paper>
  );
}


export default  CollapsibleOrderTable;