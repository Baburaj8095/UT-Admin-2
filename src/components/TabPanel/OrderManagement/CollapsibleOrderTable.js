import React,{useState} from 'react';
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
import Typography from '@material-ui/core/Typography';

import moment from 'moment';
import { reactLocalStorage } from 'reactjs-localstorage';
import { NavLink, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Paginator from 'react-paginate';
import InventoryTabContentCss from '.././InventoryTabContent/InventoryTabContent.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
    'Accept' : '/',
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
            }).catch(error=>{
              window.alert("someting went wrong. Please try again.")
            })

}


//inner table, using the props tableData passed from the OrderManagement.js
function Row(props) {

  console.log(props)

  const classes2 = useStyles();


  const { row } = props;
  const { row1 } = props;

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow className={classes2.paper}>
      <TableCell>
        { row.orderItems.length >1 &&
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          }
        </TableCell>
              <TableCell component="th" scope="row"> <NavLink to="/order-details" style={{textDecoration:'none'}} onClick={(order_id)=>handleOrderClick(row.id)}> { row.id }</NavLink></TableCell>
              <TableCell component="th">{moment(row.placedDate).format('DD-MM-YYYY, hh:mm A')}</TableCell>
              <TableCell component="th">{row.status}</TableCell>
              <TableCell component="th">{row.customer.firstName}</TableCell>
                        
              <TableCell component="th">

                                        { row.status  == 'COMPLETED' ?  <DoneIcon style={{color:'green'}}/>

                                                                     :  <div style={ row.status  !== 'CONFIRMED' ? {cursor:'not-allowed'} : {cursor:'pointer'}}>
                                                                          <Button variant="outlined" style={ row.status  == 'CONFIRMED' ?  {color:'green'} : {color:'grey',pointerEvents:'none'}} onClick={(order_id) =>{completeOrderStatus(row.id)}}>Complete</Button>
                                                                        </div>
                                          }
              </TableCell>
                    
          
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Delivery Date</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell align="right">Unit Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total Price</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                row.orderItems.map((values) => (
                    <TableRow key={values.id}>
                      <TableCell component="th" scope="row">
                      {values.deliveryDate}
                      </TableCell>
                      <TableCell>{values.name}</TableCell>
                      <TableCell align="right">{values.unitName}</TableCell>
                      <TableCell align="right">
                        {values.status}
                      </TableCell>
                      <TableCell align="right">
                        {values.unitPrice}
                      </TableCell>
                      <TableCell align="right">
                        {values.totalPrice}
                      </TableCell>
                    </TableRow>
  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
       
      
    </React.Fragment>
  );
}




//main function
const CollapsibleOrderTable = (props)=> {
  const   history = useHistory();

  const data = props.tableData; 
  const data_1 = props.tableData1; 

  console.log(props.tableData1)


  reactLocalStorage.set('table_data_length', data.length);
  const classes2 = useStyles();

  const [open, setOpen] = React.useState(false);



//marking all confirmed orders as completed
  const [state, setState] = React.useState(false);

  const handleMarkAll = (event) => {



      let confirmWindow = window.confirm("Please confirm to mark all the CONFIRMED orders as COMPLETED");

      setState(confirmWindow);

          if(confirmWindow===true && event.target.checked === true)
          {
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

                                  if(success){
                                    window.location.href='/homepage';
                                  //history.push('/orders');
                                  
                                  }

                              });
                              
                        history.push('/')


                  }else{
                    setState(confirmWindow)

                  }

                })

            }//inner if

           


  
  }; //func closing



   //pagination setup starts
   const [pageNumber, setPageNumber] = useState(0);

   //method to change the paginator number
   const changePage = ({selected}) =>{
       setPageNumber(selected);
   }

   let itemsPerPage = 6;

   const pagesVisited = pageNumber * itemsPerPage;

   const pageCount = Math.ceil(data.length / itemsPerPage);
   
   console.log("pagesVisited: "+pagesVisited+", pageCount: "+pageCount);
   //pagination setup ends






  return (
    <Auxiliary>
    <Paper className={classes2.paper}>
      <Table stickyHeader>

        <TableHead>
          <TableRow style={{backgroundColor:'#E6E6FA', textAlign:'center'}}>
          <TableCell style={{fontSize:'17px'}}></TableCell>

            <TableCell style={{fontSize:'17px'}}>Order ID</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Order Date</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Status</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Customer Name</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">
                   { 
                     <FormGroup row>     
                        <FormControlLabel
                          control={<GreenCheckbox checked={state} onChange={handleMarkAll} name="isChecked" />}
                          label="Mark all as completed"
                          labelPlacement="end"
                        />   
                    </FormGroup>
                    }
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.slice(pagesVisited, pagesVisited + itemsPerPage ).map((row) => (

              <Row key={row.name} row={row} row1={data_1} />

      
          ))}
        </TableBody>
        
      </Table>
    </Paper>


        <Paginator
            previousLabel = {"<"}
            nextLabel = {">"}
            pageCount = {pageCount}
            onPageChange = {changePage}
            containerClassName={InventoryTabContentCss.paginationButtons}
            previousLinkClassName = {InventoryTabContentCss.previousButton}
            nextLinkClassName={InventoryTabContentCss.nextButton}
            disabledClassName = {InventoryTabContentCss.paginationDisabled}
            activeClassName = {InventoryTabContentCss.activePageNumberButton}                  
            />
</Auxiliary>
  );
}


export default  CollapsibleOrderTable;
