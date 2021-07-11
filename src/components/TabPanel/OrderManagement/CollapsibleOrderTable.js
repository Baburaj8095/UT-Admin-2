import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DoneIcon from '@material-ui/icons/Done';

import moment from 'moment';
import { reactLocalStorage } from 'reactjs-localstorage';
import { NavLink, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles({
  paper: {
    //width: '100%',
    margin:'10px'
  },
  container: {
    maxHeight: 440,
  },
});




//mark all as complete checkbox styling
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);





  //storing the order_id in a local storage
  const handleOrderClick =(id) =>{
    reactLocalStorage.set("order_id", id);
    console.log("order_id from the loalStorage: ",reactLocalStorage.get("order_id"));
}




//api details
const token = reactLocalStorage.get('id_token');
const jwtToken ='Bearer '+token;
const headerObject = {
    'Authorization': jwtToken,
    'Accept' : '*/*',
    'Content-Type': 'application/json',
    'App-Token' : 'A14BC'
  }



//updating order status to completed
const completeOrderStatus = (orderID) =>{

  const api = "/orders";

  const statusUpdate = {
    id: orderID,
    status: 'COMPLETED',
  }

  axios.put(
            api,
            statusUpdate,
            {headers: headerObject}

            ).then(success=>{
              window.location = '/orders';
            })

}


//inner table, using the props tableData passed from the OrderManagement.js
function Row(props) {

  const classes2 = useStyles();


  const { row } = props; //outer table data


  return (
    <React.Fragment>
      <TableRow className={classes2.paper}>
              <TableCell component="th" scope="row"> <NavLink to="/order-details" style={{textDecoration:'none'}} onClick={(order_id)=>handleOrderClick(row.id)}> { row.id }</NavLink></TableCell>
              <TableCell component="th">{moment(row.placedDate).format('DD-MM-YYYY, hh:mm A')}</TableCell>
              <TableCell component="th">{row.status}</TableCell>
              <TableCell component="th">{row.customer.firstName}</TableCell>
              <TableCell component="th">{ moment(row.deliveryInfo.slotStart).format('DD-MM-YYYY, hh:mm A')} - { moment(row.deliveryInfo.slotEnd).format('DD-MM-YYYY, hh:mm A')}</TableCell>
                        
              <TableCell component="th">

                                        { row.status  == 'COMPLETED' ?  <DoneIcon style={{color:'green'}}/>

                                                                     :  <div style={ row.status  !== 'CONFIRMED' ? {cursor:'not-allowed'} : {cursor:'pointer'}}>
                                                                          <Button variant="outlined" style={ row.status  == 'CONFIRMED' ?  {color:'green'} : {color:'grey',pointerEvents:'none'}} onClick={(order_id) =>{completeOrderStatus(row.id)}}>Complete</Button>
                                                                        </div>
                                          }
              </TableCell>
                    
          
      </TableRow>
       
      
    </React.Fragment>
  );
}




//main function
const CollapsibleOrderTable = (props)=> {
  const   history = useHistory();

  const data = props.tableData; //data passed as props in OrderManagement.js
  reactLocalStorage.set('table_data_length', data.length);
  const classes2 = useStyles();




//marking all confirmed orders as completed
  const [state, setState] = React.useState({
    isChecked: false,
  });

  const handleMarkAll = (event) => {

      setState({[event.target.name]: event.target.checked });
      
      if(!state.isChecked){ //when true

        data.map(orders =>{

          if(orders.status === 'CONFIRMED'){

              const api = "/orders";

              const statusUpdate = {
                            id: orders.id,
                            status: 'COMPLETED',
                          }
          
              axios.put(
                        api,
                        statusUpdate,
                        {headers: headerObject}
            
                        ).then(success=>{
                          history.push('/orders');
                        })

          }else{
            console.log(orders.id+" is not confirmed yet. status: "+orders.status)
          }

        })

        }
  };







  return (
    <Paper className={classes2.paper}>
      <Table stickyHeader>

        <TableHead>
          <TableRow style={{backgroundColor:'#E6E6FA', textAlign:'center'}}>
            <TableCell style={{fontSize:'17px'}}>Order ID</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Order Date</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Status</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Customer Name</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Delivery Slot</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">
                   { 
                     <FormGroup row>     
                        <FormControlLabel
                          control={<GreenCheckbox checked={state.isChecked} onChange={handleMarkAll} name="isChecked" />}
                          label="Mark all as completed"
                          labelPlacement="end"
                        />   
                    </FormGroup>
                    }
            </TableCell>
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