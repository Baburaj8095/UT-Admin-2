import { Card, CardContent, makeStyles } from '@material-ui/core'
import { Typography } from 'antd'
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



    return (
        <div style={{border:'1px solid #DEDBDB'}}>

          {
            deliveryInf.deliveryInfo && 
                    
                    <table>
                        <tr rowSpan="3" style={{backgroundColor:'#DEDBDB'}}> <th></th> <td rowSpan="1" style={{ minWidth:'260px' }}><strong style={{fontSize:'26px', opacity:'0.7'}}>Delivery Information</strong> </td>    <th></th></tr>
                        
                        <tr>
                            <th><h6>Postal Code</h6></th>  <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{deliveryInf.deliveryInfo.postalCode}</Typography></td> <td></td>
                        </tr>

                        <tr>
                            <th><h6>City</h6></th>  <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{deliveryInf.deliveryInfo.city}</Typography></td><td></td>
                        </tr>

                        <tr>
                          <th style={{minWidth:'240px'}}><h6>Country</h6></th>   <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{deliveryInf.deliveryInfo.country}</Typography></td><td style={{minWidth:'130px'}}></td>
                        </tr>
                        <tr>
                          <th><h6>Gift Message</h6></th>   <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{!deliveryInf.deliveryInfo.gift? 'Not Specified': deliveryInf.deliveryInfo.gift}</Typography></td><td></td>
                        </tr>

                        <tr>
                          <th><h6>Gift Option</h6></th>  <td><Typography  variant="body2"  style={{color:'grey'}} component="h6">  {!deliveryInf.deliveryInfo.go? 'Not Specified' :deliveryInf.deliveryInfo.go}</Typography></td><td></td>
                        </tr>

                        <tr>
                          <th><h6>Delivery Note</h6></th>  <td><Typography  variant="body2"  style={{color:'grey'}} component="h6">  {!deliveryInf.deliveryInfo.go? 'Not Specified' :deliveryInf.deliveryInfo.deliveryNote}</Typography></td><td></td>
                        </tr>

                        <tr>
                          <th><h6>Zero Plastic</h6></th>  <td><Typography  variant="body2"  style={{color:'grey'}} component="h6">  {!deliveryInf.deliveryInfo.zp? 'Not Specified' :deliveryInf.deliveryInfo.zp}</Typography></td><td></td>
                        </tr>
                    </table>
                }
                
                
        </div>
    )
}

export default DeliveryInfo
