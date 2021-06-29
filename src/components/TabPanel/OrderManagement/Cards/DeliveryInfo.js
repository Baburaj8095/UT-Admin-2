import { Card, CardContent, makeStyles } from '@material-ui/core'
import { Typography } from 'antd'
import React from 'react'



const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        height:350,
        overflowY:'scroll',

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

      //drop-down
      formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
   
    
  }));

const DeliveryInfo = (props) => {

    const classes = useStyles();
    const deliveryInf = props.delInfo;
//deliveryInfo
    return (
        <div>

    { deliveryInf.deliveryInfo && <Card className={classes.root}>

            <CardContent>

                <div>
                    
                    <span style={{marginTop:'20px', width:'50px'}}>
                    <strong style={{fontSize:'26px'}}>Delivery Information</strong>
                    </span>
                  <br />

                  <div style={{marginTop:'12px'}}>
                        <span>
                            <strong>Postal Code: </strong>                  
                            <Typography variant="body2" color="textSecondary" component="span">
                                {deliveryInf.deliveryInfo.postalCode}
                            </Typography>                      
                        </span>
                  </div>
                <br />


                <div style={{marginTop:'12px'}}>
                        <span>
                            <strong>City: </strong>                  
                            <Typography variant="body2" color="textSecondary" component="span">
                                    {deliveryInf.deliveryInfo.city}
                            </Typography>                      
                        </span>
                  </div>
                <br />


                <div style={{marginTop:'12px'}}>
                        <span>
                            <strong>Country: </strong>                  
                            <Typography variant="body2" color="textSecondary" component="span">
                                {deliveryInf.deliveryInfo.country}
                            </Typography>                      
                        </span>
                  </div>
                <br />


                <div style={{marginTop:'12px'}}>
                        <span>
                            <strong>Gift Message: </strong>                  
                            <Typography variant="body2" color="textSecondary" component="span">
                            {!deliveryInf.deliveryInfo.gift? 'not specified': deliveryInf.deliveryInfo.gift}
                            </Typography>                      
                        </span>
                  </div>
                <br />

                <div style={{marginTop:'12px'}}>
                        <span>
                            <strong>Gift Option: </strong>                  
                            <Typography variant="body2" color="textSecondary" component="span">
                                {!deliveryInf.deliveryInfo.go? 'not specified' :deliveryInf.deliveryInfo.go}

                            </Typography>                      
                        </span>
                  </div>
                <br />

                <div style={{marginTop:'12px'}}>
                    
                        <span>
                            <strong>Zero Plastic: </strong>                  
                            <Typography variant="body2" color="textSecondary" component="span">
                                {!deliveryInf.deliveryInfo.zp? 'not specified' :deliveryInf.deliveryInfo.zp}
                            </Typography>                      
                        </span>
                  </div>
                <br />
                
                </div>

            </CardContent>

            </Card>
            
    }
        </div>
    )
}

export default DeliveryInfo
