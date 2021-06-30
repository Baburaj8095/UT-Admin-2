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



const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 650,
      marginLeft: '20px',
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
    history.push('/');

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
  const dropDownstatuses = ['CREATED', 'PROCESSING', 'CONFIRMED', 'COMPLETED','PENDING', 'CANCELLED'];
  const statuses = ['CREATED', 'PROCESSING', 'CONFIRMED', 'COMPLETED'];  

const [activeStep, setActiveStep] = useState(0);
   

 //update button

 const apiToUpdate = "/orders";

 const statusUpdate = {
                        id: OrderStatus.id,
                        status: OrderStatus.status,
                      }
const handleUpdateClick = () => {

    axios.put(apiToUpdate,
            statusUpdate,
            {headers: headerObject} 
            )
            .then(response=>{
              console.log("staus updated: ",response)
                //for timeline
                if(statuses.includes(response.data.status)){

                  let index = statuses.indexOf(response.data.status);
                    setActiveStep((prevActiveStep) => prevActiveStep + index);
              
                }

                return history.push("/order-details");
                  }
              )    
  
};



//order details
const [orders, setOrders] = useState([]);

//orderitems


  //get the orders based on order id
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
                console.log("ORDERS based on order id : ",order.data.status);
                setisLoading(false);
                if(statuses.includes(order.data.status)){

                  let index = statuses.indexOf(order.data.status);
                    setActiveStep((prevActiveStep) => prevActiveStep + index);
              
                }
              return order;
            })
  },[api, jwtToken]);




const classes2 = useStyles();



      //timeline
const getStepContent=(step)=> {
  switch (step) {
    case 0:
      return `Order placed`;
    case 1:
      return 'Order is being processing';
    case 2:
      return `Order is being Confirmed`;
    case 3:
      return `Order is confirmed`;
    case 4:
      return `The order is completed`;
    case 5:
      return `Order cancelled`;
    case 6:
      return `Order is Pending`;
    default:
      return 'Unknown status';
  }
}





return (
        <Auxiliary>
      
            <div style={{position:'absolute'}}>

                  {/* header start */}
  
                    <div>
                        <div className={HeaderClass.Header}>
                                  <Button style={{float:'left', margin:'15px', opacity: '0.7', fontWeight:'1000', fontSize: '16px'}}><strong>URBAN TILLER</strong></Button>
                                  <Button onClick={logout} variant="outlined" style={{float:'right', color: 'white', margin:'18px', borderColor: 'white'}}><strong>Logout</strong></Button>          
                          </div>
                    </div>
                  {/* header end */}

                      <div style={{margin:0,marginTop:'110px', marginLeft: '20px'}}>
                            
                            <div>
                            <Typography gutterBottom variant="h4" component="h4">
                                    <NavLink to="/orders" style={{textDecoration:'none'}}>Orders</NavLink> / <span style={{color:'grey'}}>order-details</span>
                            </Typography>
                            </div>

                              {/* TimeLine orderitem table */}
                            <div style={{display: "flex", height:'500px',marginTop:'50px'}}> 
                              <div>
                                <Card className={classes.root}>

                                    <CardContent>

                                        <div>
                                            <span style={{marginTop:'20px', width:'50px'}}><strong>Placed Date:</strong> {moment(orders.placedDate).format('DD-MM-YYYY, hh:mm A')}</span>
                                            <span style={{float:'right'}}><strong>Order ID:</strong> {orders.id}</span>
                                        </div>


                                          {/*---------- stepper --------------*/}
                                        <div className={classes.timeLine}>
                                            <Stepper activeStep={activeStep} orientation="vertical">
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

                                    {/* status drop-down */}
                                    
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="status">Update Order Status</InputLabel>
                                            <Select
                                            native
                                            id= 'status'
                                            value={OrderStatus.status}
                                            onChange={(event)=>{handleStatusChange(event)}}
                                            label="Update Order Status"
                                            
                                            
                                            >
                                            <option aria-label="None" value="" />
                                            {dropDownstatuses.map((res, index)=>{
                                                return(<option id={index} key={index} value={res}>{res}</option>
                                                )
                                            })}
                                            </Select>
                                        </FormControl>
                                        

                                    <CardActions className={classes.expand} disableSpacing>
                                        <Button variant="contained" style={{backgroundColor:'#5ABC0F', color:'white',width:'150px', height:'52px'}} onClick={handleUpdateClick}>Update</Button>
                                    </CardActions>
                                        
                                </Card>
                            </div>



                            {/* OrderItems table */}

                            <div>
                              <OrderItems OrderItem={orders}/>
                            </div>

                      </div>


                   {/* CustomerDetails, DeliveryInfo, deliverySlot and paymentdetails*/}

                            <div style={{display:'flex', marginTop:'30px'}}>

                                  <div style={{marginLeft:'20px'}}>
                                    <CustomerDetails theOrder={orders} />
                                  </div>
                                  
                                  <div style={{marginLeft:'50px'}}>
                                    <DeliveryInfo delInfo={orders}/>
                                  </div>


                                  <div style={{ marginLeft:'85px'}}>
                                    <DeliverySlot delSlots={orders} />
                                  </div>
                              
                                  <div style={{ marginLeft:'80px'}}>
                                    <PaymentDetails paymentDetails={orders}/>
                                  </div>

                            </div>     
                      </div>


                {/* <div style={{backgroundColor: 'grey', color:'white', position:'absolute', bottom:'0', width:'100%', height:'149px'}}>
                      <Footer />
                    </div>   */}



          </div>
              
    </Auxiliary>
    )
}

export default OrderDetailsPage
