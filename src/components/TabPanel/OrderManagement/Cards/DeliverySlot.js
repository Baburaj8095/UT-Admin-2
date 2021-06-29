import { Card, CardContent, makeStyles } from '@material-ui/core'
import { Typography } from 'antd'
import moment from 'moment';
import React from 'react'



const useStyles = makeStyles((theme) => ({
    root: {
      width: 300,
      height:350,
      overflowY:'scroll'
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




const DeliverySlot = (props) => {


    const classes = useStyles();

    const deliverySlots = props.delSlots;
    return (
    <div>

      { deliverySlots && <Card className={classes.root}>

                    <CardContent>

                        <div>
                            <span style={{marginTop:'20px'}}>
                              <strong style={{fontSize:'26px'}}>Delivery Slot</strong>
                            </span>

                            <br />

                            <div style={{marginTop:'12px'}}>
                                  <span>
                                      <strong>Contactless: </strong>                  
                                      <Typography variant="body2" color="textSecondary" component="span">
                                      {deliverySlots.contactless}
                                      </Typography>                      
                                  </span>
                            </div>
                          <br />


                          <div style={{marginTop:'12px'}}>
                                  <span>
                                      <strong>Slot start: </strong>                  
                                      <Typography variant="body2" color="textSecondary" component="span">
                                          {deliverySlots.deliveryInfo && moment(deliverySlots.deliveryInfo.slotStart).format('DD-MM-YYYY, hh:mm A')}
                                      </Typography>                      
                                  </span>
                            </div>
                          <br />

                          <div style={{marginTop:'12px'}}>
                                  <span>
                                      <strong>Slot end: </strong>                  
                                      <Typography variant="body2" color="textSecondary" component="span">
                                      {deliverySlots.deliveryInfo && moment(deliverySlots.deliveryInfo.slotEnd).format('DD-MM-YYYY, hh:mm A')}
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

export default DeliverySlot
