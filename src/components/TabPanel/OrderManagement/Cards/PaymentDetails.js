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
//table
    paper: {
        width: '100%',
      },
      container: {
        maxHeight: 440,
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




const PaymentDetails = (props) => {

    const classes = useStyles();

    const payment = props.paymentDetails;

    return (
    <div>

    { payment &&   <Card className={classes.root}>

        <CardContent>

            <div>
                <span style={{marginTop:'20px'}}>
                  <strong style={{fontSize:'26px'}}>Payment Details</strong>
                </span>
                <br />

                <div style={{marginTop:'12px'}}>
                        <span>
                            <strong>Payment: </strong>                  
                            <Typography variant="body2" color="textSecondary" component="span">
                                {payment.pm}
                            </Typography>                      
                        </span>
                  </div>
                <br />

                <div style={{marginTop:'12px'}}>
                        <span>
                            <strong>Promo Code: </strong>                  
                            <Typography variant="body2" color="textSecondary" component="span">
                                {moment(payment.promo).format('DD-MM-YYYY, hh:mm A')}
                            </Typography>                      
                        </span>
                  </div>
                <br />


                <div style={{marginTop:'12px'}}>
                        <span>
                            <strong>Total Before Discount: </strong>                  
                            <Typography variant="body2" color="textSecondary" component="span">
                                  {payment.totalBeforeDiscount}
                            </Typography>                      
                        </span>
                  </div>
                <br />


                <div style={{marginTop:'12px'}}>
                        <span>
                            <strong>Total Tax: </strong>                  
                            <Typography variant="body2" color="textSecondary" component="span">
                                  {payment.totalTax}
                            </Typography>                      
                        </span>
                  </div>
                <br />


                <div style={{marginTop:'12px'}}>
                        <span>
                            <strong>Total: </strong>                  
                            <Typography variant="body2" color="textSecondary" component="span">
                                {payment.total}
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

export default PaymentDetails
