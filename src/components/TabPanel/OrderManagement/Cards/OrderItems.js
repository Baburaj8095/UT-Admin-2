import { Card, CardContent, FormControl, Grid, InputLabel, makeStyles, Select } from '@material-ui/core';
import React, {useState} from 'react';

import moment from 'moment';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
    root: {
     
      minHeight:340,
      maxWidth: 450,
      backgroundColor: '#fff',
      backgroundClip: 'border-box',
      border: '1px solid rgba(0,0,0,.125)',
      borderRadius: '.25rem',
      margin : '10px',

    },
    formControl:{
      float:'right'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    button :{
      position: 'inherit'

    },
    expand: {
      transform: 'rotate(0deg)',
      float: 'right',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },

    
  }));
  



const OrderItems = (props) => {


    const OrderItems = props.OrderItem;

    var appends = "";



    const classes = useStyles();  

    const   history = useHistory();

    //UNAVAILABLE, AVAILABLE, DELIVERED, BACK_ORDER, OUT_OF_STOCK

    const statuses = ['AVAILABLE', 'UNAVAILABLE', 'OUT_OF_STOCK','BACK_ORDER', 'DELIVERED'];  

    //order status input change
    const [OrderItemStatus, setOrderItemStatus] = useState({
                                                              id: null,
                                                              status:'',  
                                                            });


     //update status handler
     
    const token = reactLocalStorage.get('id_token');
    const jwtToken ='Bearer '+token;
    const headerObject = {
        'Authorization': jwtToken,
        'Accept' : '*/*',
        'Content-Type': 'application/json',
        'App-Token' : 'A14BC'
      }

      const orderId=reactLocalStorage.get("order_id");

    const handleStatusChange = (event, orderItemID) => {
        const newData= {id: orderItemID, status:event.target.value};
        setOrderItemStatus(newData);

                  
          //status update

          const apiToUpdate = "/orders/status";

          const statusUpdate = {
                                  id: parseInt(orderId),
                                  status:'PROCESSING',
                                  orderItems:[
                                                {
                                                  id: parseInt(orderItemID),
                                                  status: (event.target.value),
                                                }
                                              ]
                              }


              console.log("orderItemID",event.target.value, orderItemID);


              axios.put(apiToUpdate,
                      statusUpdate,
                      {headers: headerObject} 
                      )
                      .then(response=>{
                          console.log("staus updated: ",response)
                          return history.push("/order-details");
                            }
                        );    

    };





    return (

       <>

                    {
                      OrderItems.orderItems && OrderItems.orderItems.map((res, index) =>{

                                return(
                                <div style={{margin:'24px', border:'2px solid #DEDBDB', minHeight:'260px', maxHeight:'280px', width:'700px'}}>

                                      <div >
                                            <div style={{textAlign:'center',float:'left',marginLeft:'18px', marginTop:'20px'}}>
                                                <span style={{color:'black'}}>Delivery Date:</span> {moment(res.deliveryDate).format('YYYY-MM-DD, HH:MM')}
                                            </div>
                                            <div style={{float:'right'}}>
                                                <FormControl variant="outlined" style={{width:'220px', marginRight:'10px'}}>
                                                                <InputLabel id="status">Update Order Status</InputLabel>
                                                                <Select
                                                                  style={{height:'44px',textAlign:'center', margin:'7px'}}
                                                                  native
                                                                  id= 'status'
                                                                  value={OrderItemStatus.status}
                                                                  onChange={(event, id)=>{handleStatusChange(event, res.id)}}
                                                                  label="Update Order Status"
                                                                                                        
                                                                >
                                                                <option aria-label="None" value="" />
                                                                {statuses.map((res, index)=>{
                                                                    return(<option id={index} key={index} value={res}>{res}</option>
                                                                    )
                                                                })}
                                                                </Select>
                                                  </FormControl>
                                              </div>
                                            
                                      </div>
                                
                                      <div style={{marginTop:'60px'}}>
                                          <hr style={{width:'94.5%', border:'0.6px solid grey'}}/>
                                      </div>

                                      <div style={{display:'flex', position:'relative'}}>
                                        
                                              <img src={res.product.productImage} style={{border:'1px solid #DEDBDB',height:'120px',marginTop:'1px', marginLeft:'17px', width:'130px'}} alt={res.name} />
                   
                                              <div style={{marginLeft:'60px'}}>
                                                  <h6>{res.name}</h6>
                                                  <p>Unit Name: {res.unitName}</p>
                                                  <p>Status: <span style={{color:'green'}}>{res.status}</span></p>
                                                  <p>Unit Price: {res.unitPrice}</p>
                                                  <span>Total Price: {res.totalPrice}</span>  <span style={{borderRadius:'12px', height:'25px', width:'75px', textAlign:'center', marginLeft:'290px', backgroundColor:'lightgreen', color:'white', float:'right'}}>Qty: {res.quantity}</span>

                                              </div>
                                          
                                      
                                      </div>
                                                    
                          </div>
                                  )
                      }
                      )//end of map
                    }
</>
    )
}

export default OrderItems;
