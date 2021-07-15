import { Card, CardContent, makeStyles } from '@material-ui/core'
import { Typography } from 'antd'
import moment from 'moment';
import React from 'react'



const useStyles = makeStyles((theme) => ({
    root: {
      width: 345,
        height:350,
        overflowY:'scroll',
        backgroundColor: '#fff',
        backgroundClip: 'border-box',
        border: '1px solid rgba(0,0,0,.125)',
        borderRadius: '.25rem',
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
    <div style={{border:'1px solid #DEDBDB', marginRight:'20px'}}>

    { payment &&  
    
      <table>
              <tr rowSpan="3" style={{backgroundColor:'#DEDBDB'}}> <th></th> <td rowSpan="1" style={{ minWidth:'365px'}}><strong style={{fontSize:'26px', opacity:'0.7'}}>Payment Details</strong> </td>    <th></th></tr>
              <tr >
                  <th><h6 style={{marginLeft:'15px'}}>Payment</h6></th>  <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{payment.pm}</Typography></td> <td></td>
              </tr>

              <tr>
                  <th><h6  style={{marginLeft:'15px'}}>Promo Code</h6></th>  <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{!payment.promo || payment.promo === null || payment.promo === '' ? 'None is Applied' : payment.promo}</Typography></td><td></td>
              </tr>

              <tr>
                <th style={{minWidth:'240px'}}><h6 style={{marginLeft:'15px'}}>Total Before Discount</h6></th>   <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{payment.totalBeforeDiscount}.00</Typography></td><td style={{minWidth:'130px'}}></td>
              </tr>

              <tr>
                <th style={{minWidth:'240px'}}><h6 style={{marginLeft:'15px'}}>Discount</h6></th>   <td><Typography  variant="body2" style={{color:'green'}} component="h6">{-payment.discount}.00</Typography></td><td style={{minWidth:'130px'}}></td>
              </tr>

              <tr>
                <th><h6 style={{marginLeft:'15px'}}>Total Tax</h6></th>   <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{payment.totalTax}.00</Typography></td><td></td>
              </tr>

              <tr>
                <th><h6 style={{marginLeft:'15px'}}>Delivery Fee</h6></th>   <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{payment.delivery}.00</Typography></td><td></td>
              </tr>

              <tr>
                <th><h6 style={{marginLeft:'15px'}}>Total</h6></th>  <td><Typography  variant="body2"  style={{color:'grey'}} component="h6">{payment.total}.00</Typography></td><td></td>
              </tr>
          </table>
    
    }
</div>
    )
}

export default PaymentDetails
