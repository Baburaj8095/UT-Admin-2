import { Card, CardContent, makeStyles } from '@material-ui/core'
import { Typography } from 'antd'
import React from 'react'



const useStyles = makeStyles((theme) => ({
    root: {//this changes the width and height of the card
      width: 300,
      height:350,
      overflowY:'scroll'
    },
    media: {
      height: 0,
    },
    expand: {
      transform: 'rotate(0deg)',
      float: 'right',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },   
    
  }));



const CustomerDetails = (props) => {

    const classes = useStyles();

    const Orders = props.theOrder;

    return (
    <div>
    {  Orders.customer &&    <Card className={classes.root}>

              <CardContent>

              <div>
                <span style={{marginTop:'20px', width:'50px'}}>
                    <strong style={{fontSize:'26px'}}>Customer Details</strong>
                </span>
                  <br />

                  <div style={{marginTop:'12px'}}>
                        <span>
                            <strong>First Name: </strong>                  
                            <Typography variant="body2" color="textSecondary" component="span">
                                    {Orders.customer.firstName}
                            </Typography>                      
                        </span>
                  </div>
                <br />
                <div >
                      <span >
                          <strong>Last Name: </strong>
                            
                              <Typography variant="body2" color="textSecondary" component="span">
                                  {Orders.customer.lastName}
                              </Typography> 
                          
                      </span>
                </div>
                <br />
                <div>
                      <span>
                          <strong>Gender: </strong>
                            
                              <Typography variant="body2" color="textSecondary" component="span">
                                  {Orders.customer.gender === null || Orders.customer.gender === '' ? 'not specified': Orders.customer.gender}
                              </Typography> 
                          
                      </span>
                </div>
                <br />
                <div>
                      <span>
                          <strong>Email: </strong>
                            
                              <Typography variant="body2" color="textSecondary" component="span">
                                  {Orders.customer.email}
                              </Typography> 
                          
                      </span>
                  </div>
                <br />
                <div>
                    <span >
                        <strong>Phone: </strong>
                          
                            <Typography variant="body2" color="textSecondary" component="span">
                                {Orders.customer.phone}
                            </Typography> 
                        
                    </span>
              </div>

            </div>

        </CardContent>

        </Card>
        
    }
    </div>
    )
}

export default CustomerDetails
