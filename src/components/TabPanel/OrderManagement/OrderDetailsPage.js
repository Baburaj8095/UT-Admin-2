import { Button } from '@material-ui/core';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { NavLink, useHistory } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import Auxiliary from '../../../hoc/Auxiliary';
import HeaderClass from '../../../components/HomePage.js/HomePage.module.css';
import axios from 'axios';
import moment from 'moment';


import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OrderItems from './Cards/OrderItems';
import CustomerDetails from './Cards/CustomerDetails';
import DeliveryInfo from './Cards/DeliveryInfo';
import DeliverySlot from './Cards/DeliverySlot';
import PaymentDetails from './Cards/PaymentDetails';

//timeline
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Grid from 'antd/lib/card/Grid';



const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
    root: {
      minWidth: 650,
      marginLeft: '5px',
      marginTop:'18px',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      float: 'right',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
//table
    paper: {
        width: 650,
      },
      container: {
        width: 650,
        maxHeight: 440,
      },

      //drop-down
      formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
        float:'right',
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      //timeline
      timeLine: {
        width: '100%',
      },
      actionsContainer2: {
        marginBottom: theme.spacing(2),
      },
      resetContainer2: {
        padding: theme.spacing(3),
      },
   
    
  }));
  

const OrderDetailsPage = () => {
    
const classes = useStyles();   

const [isLoading, setisLoading] = useState(true);

//handle logout
const   history = useHistory();

if(reactLocalStorage.get('id_token') == null || reactLocalStorage.get('id_token') === ''){
  history.push('/');
    }

const logout=()=>{
    reactLocalStorage.remove('id_token');
    history.push('/admin_dashboard_new');

}


//api details
const orderId=reactLocalStorage.get("order_id");
const api = "/orders/"+orderId;
const token = reactLocalStorage.get('id_token');
const jwtToken ='Bearer '+token;
const headerObject = {
    'Authorization': jwtToken,
    'Accept' : '*/*',
    'Content-Type': 'application/json',
    'App-Token' : 'A14BC'
  }


//order status

const [OrderStatus, setOrderStatus] = useState({
                                                 id: parseInt(orderId),
                                                 status:'',  
                                                });

  const handleStatusChange = (event) => {
    const newData= {...OrderStatus, status:event.target.value};
    
    setOrderStatus(newData);
    console.log(newData)

  };



  //timeline
  const getAllStatuses = React.useCallback(() => { 
    const dropDownstatuses = ['CREATED', 'PROCESSING', 'CONFIRMED', 'COMPLETED','PENDING', 'CANCELLED'];
    return dropDownstatuses;
  }, []);


  const statuses = ['CREATED', 'PROCESSING', 'CONFIRMED', 'COMPLETED'];  

  const [activeStep, setActiveStep] = useState(0);
   

 //update button

 const apiToUpdate = "/orders";

 const statusUpdate = {
                        id: OrderStatus.id,
                        status: OrderStatus.status,
                      }

const statusArray  = getAllStatuses();

const handleUpdateClick = () => {

    axios.put(apiToUpdate,
            statusUpdate,
            {headers: headerObject} 
            )
            .then(response=>{
                if(statusArray.includes(response.data.status)){

                  let index = statusArray.indexOf(response.data.status);
                    setActiveStep((prevActiveStep) => prevActiveStep + index);
              
                }

                return history.push("/order-details");
                  }
              )    
  
};



//order details
const [orders, setOrders] = useState([]);

useEffect( () =>{
    axios.get(api, {
            headers: {
            'Authorization': jwtToken,
            'Accept' : '*/*',
            'Content-Type': 'application/json',
            'App-Token' : 'A14BC'
              }
            })
            .then(order =>{
              setOrders(order.data);
                setisLoading(false);
                if(statusArray.includes(order.data.status)){

                  let index = statusArray.indexOf(order.data.status);
                    setActiveStep((prevActiveStep) => prevActiveStep + index);
              
                }
              return order;
            })
  },[api, jwtToken]); // eslint-disable-line react-hooks/exhaustive-deps




const classes2 = useStyles();



      //timeline
const getStepContent=(step)=> {
  switch (step) {
    case 0:
      return `Order placed`;
    case 1:
      return 'Order is processing';
    case 2:
      return `Order is Confirmed`;
    case 3:
      return `The order is completed`;
    case 4:
      return `Order cancelled`;
    case 5:
      return `Order is Pending`;
    default:
      return 'Unknown status';
  }
}




return (
        <Auxiliary>
      
            <div style={{position:'absolute'}}>

                  {/* header start */}
  
                        <div className={HeaderClass.Header} style={{zIndex: '11'}}>
                                  <Button style={{float:'left', margin:'15px', opacity: '0.7', fontWeight:'1000', fontSize: '16px'}}><strong>URBAN TILLER</strong></Button>
                                  <Button onClick={logout} variant="outlined" style={{float:'right', color: 'white', margin:'18px', borderColor: 'white'}}><strong>Logout</strong></Button>          
                          </div>
                  {/* header end */}

                      <div style={{margin:0,marginTop:'110px', marginLeft: '20px'}}>
                            
                            <div>
                            <Typography gutterBottom variant="h4" component="h4" style={{marginLeft:'10px'}}>
                                    <NavLink to="/orders" style={{textDecoration:'none'}}>Orders</NavLink> / <span style={{color:'grey'}}>order-details</span>
                            </Typography>
                            </div>

                              {/* TimeLine */}
                              {/* TimeLine orderitem table */}
                            <div style={{marginTop:'50px',width:'98.5%'}}> 
                              <div>
                                <Card className={classes.root}>

                                    <CardContent>

                                        <div>
                                            <span style={{marginTop:'20px', width:'50px'}}><strong>Placed Date:</strong> {moment(orders.placedDate).format('DD-MM-YYYY, hh:mm A')}</span>
                                            <span style={{float:'right'}}><strong>Order ID:</strong> {orders.id}</span>
                                        </div>


                                          {/*---------- stepper --------------*/}
                                        <div className={classes.timeLine}>
                                            <Stepper activeStep={activeStep} orientation="horizontal">
                                              {statuses.map((label, index) => (
                                                <Step key={label}>

                                                  <StepLabel>{label}</StepLabel>

                                                  <StepContent>
                                                    <Typography>{getStepContent(index)}</Typography>
                                                  </StepContent>
                                                </Step>
                                              ))}
                                            </Stepper>
                                              {activeStep === 4 && (
                                                  <Paper square elevation={0} className={classes.resetContainer2}>
                                                    <Typography>The order is completed</Typography>
                                                  </Paper>
                                                )}
                                          </div>

                                    </CardContent>

                                    
                                    <CardActions className={classes.expand} >
                                        <Button variant="contained" style={{backgroundColor:'#5ABC0F', color:'white',width:'100px', height:'54px'}} onClick={handleUpdateClick}>Update</Button>
                                    </CardActions>

                                    {/* status drop-down */}
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="status">Update Order Status</InputLabel>
                                        <Select
                                        native
                                        id= 'status'
                                        value={OrderStatus.status}
                                        onChange={(event)=>{handleStatusChange(event)}}
                                        label="Update Order Status"
                                        disabled={activeStep === 4 ? true : false}                                           
                                        >
                                        <option aria-label="None" value="" />
                                        {statusArray.map((res, index)=>{
                                            return(<option id={index} key={index} value={res}>{res}</option>
                                            )
                                        })}
                                        </Select>
                                    </FormControl>                                       
                                    
                                        
                                </Card>
                            </div>
                           
                      </div>
              </div>

                <div style={{marginTop:'30px', display:'flex'}}>

                      <div >
                            <OrderItems OrderItem={orders}/>
  
                      </div>        

                      {/* <hr style={{width:'20%', marginTop:'50px', borderTop:'4px dotted green'}}/> */}

                   {/* CustomerDetails, DeliveryInfo, deliverySlot and paymentdetails*/}
                        
                            <div style={{display:'flex', marginTop:'25px',marginBottom:'30px'}}>

                                  <div style={{marginLeft:'25px'}}>
                                        <CustomerDetails theOrder={orders} />

                                        <div style={{marginTop:'20px'}}>
                                          <DeliveryInfo delInfo={orders}/>
                                        </div>


                                        <div style={{ marginTop:'20px'}}>
                                          <DeliverySlot delSlots={orders} />

                                          <div style={{marginTop:'20px'}}>
                                            <PaymentDetails paymentDetails={orders}/>
                                          </div>
                                        </div>

                                  </div>
                                  
                                  

                                  
                              
                                  

                            </div>     
                      
                    </div>

              


          </div>
              
    </Auxiliary>
    )
}

export default OrderDetailsPage
