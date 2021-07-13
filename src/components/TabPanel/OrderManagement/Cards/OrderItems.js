import { Card, CardContent, FormControl, Grid, InputLabel, makeStyles, Select } from '@material-ui/core';
import React, {useState} from 'react';
import Auxiliary from '../../../../hoc/Auxiliary';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
                                  id: orderId,
                                  status:'CONFIRMED',
                                  orderItems:[
                                                {
                                                  id: parseInt(orderItemID),
                                                  status: toString(event.target.value),
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
        <div style={{marginLeft:'15px', display:'flex', flexGrow:1}}>  
            <Grid container  style={{marginTop:'10px',display:'absolute',flexGrow:1, spacing:1}}>

                    {
                      OrderItems.orderItems && OrderItems.orderItems.map(res=>{
                        return(
                          <Grid item xs={12} sm={6} lg={3}>
                            <Grid container justifyContent="center" spacing={1}>
                              <Grid item>
                            <Card className={classes.root}>                               

                                <CardActionArea style={{position: 'initial'}}>
                                                      
                                        <CardActions >

                                          <Typography gutterBottom variant="hh6" component="h6">
                                            <span style={{color:'blue'}}>Delivery Date:</span><br />  {moment(res.deliveryDate).format('YYYY-MM-DD, HH:MM:SS')}
                                          </Typography>

                                          <FormControl variant="outlined" className={classes.formControl}>
                                              <InputLabel id="status">Update Order Status</InputLabel>
                                              <Select
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
                                    </CardActions>
                                    
                                    <CardMedia
                                      style={{margin:'15px'}}
                                      component="img"
                                      alt={res.name}
                                      height="150"
                                      image={res.product.productImage}
                                    />
                                    <CardContent>
                                      <Typography gutterBottom variant="h5" component="h2">
                                      {res.name}
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                        Unit Name : {res.unitName}
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                        Status : <span style={{color:'green'}}>{res.status}</span>
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                  <CardActions >
                                    <Button size="small" color="primary" style={{    position: 'initial'}}>
                                      Unit Price : {res.totalPrice}
                                    </Button>
                                    <Button size="small" color="primary" style={{    position: 'initial'}}>
                                    Quantity : {res.quantity}
                                    </Button>
                                  </CardActions>
                                </Card>

                              </Grid>
                            </Grid>
                          </Grid>
                         
                          )
                      })
                    }

                                                              
      </Grid> 
    </div>
    )
}

export default OrderItems;
