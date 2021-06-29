import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



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



  return (
    <React.Fragment>
      <TableRow className={classes2.paper}>         orderItems     
              <TableCell cocomponent="th">{row.orderItems.name}</TableCell>
              <TableCell cocomponent="th">{row.orderItems.unitName}</TableCell>
              <TableCell cocomponent="th">{row.orderItems.quantity}</TableCell>
              <TableCell cocomponent="th">{row.orderItems.totalPrice}</TableCell>
      </TableRow>
       
      
    </React.Fragment>
  );
}


const OrderItemsTable = (props)=> {
    

  const data = props; //data passed as props in OrderManagement.js
  console.log(data);
  const classes2 = useStyles();


  return (
    <Paper className={classes2.paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{backgroundColor:'#E6E6FA', textAlign:'center'}}>
            <TableCell style={{fontSize:'17px'}}>name</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Unit Name</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Quantity</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <Row row={data} />
          
        </TableBody>
        
      </Table>
    </Paper>
  );
}


export default  OrderItemsTable;