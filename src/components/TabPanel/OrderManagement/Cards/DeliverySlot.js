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
    <div style={{border:'1px solid #DEDBDB'}}>

      { deliverySlots && 
      
        <table>
              <tr rowSpan="3" style={{backgroundColor:'#DEDBDB'}}> <th></th> <td rowSpan="1" style={{ minWidth:'260px' }}><strong style={{fontSize:'26px', opacity:'0.7'}}>Delivery Slot</strong> </td>    <th></th></tr>
              <tr>
                  <th><h6>Contactless</h6></th>  <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{deliverySlots.contactless}</Typography></td> <td></td>
              </tr>

              <tr>
                  <th><h6>Slot start</h6></th>  <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{deliverySlots.deliveryInfo && moment(deliverySlots.deliveryInfo.slotStart).format('DD-MM-YYYY, hh:mm A')}</Typography></td><td></td>
              </tr>

              <tr>
                <th style={{minWidth:'240px'}}><h6>Slot end</h6></th>   <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{deliverySlots.deliveryInfo && moment(deliverySlots.deliveryInfo.slotEnd).format('DD-MM-YYYY, hh:mm A')}</Typography></td><td style={{minWidth:'130px'}}></td>
              </tr>
              
          </table>
      

                    
          }
  </div>
    )
}

export default DeliverySlot
