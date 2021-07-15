import { Card, CardContent, makeStyles } from '@material-ui/core'
import { Typography } from 'antd'
import React from 'react'



const useStyles = makeStyles((theme) => ({
    root: {//this changes the width and height of the card
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

    const Orders = props.theOrder;

    return (
    <div style={{border:'1px solid #DEDBDB'}}>
    {  Orders.customer &&   
          <table>
              <tr rowSpan="3" style={{backgroundColor:'#DEDBDB'}}> <th></th> <td rowSpan="1" style={{ minWidth:'260px' }}><strong style={{fontSize:'26px', opacity:'0.7'}}>Customer Details</strong> </td>    <th></th></tr>
              <tr>
                  <th><h6 style={{marginLeft:'15px'}}>First Name</h6></th>  <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{Orders.customer.firstName}</Typography></td> <td></td>
              </tr>

              <tr>
                  <th><h6 style={{marginLeft:'15px'}}>Last Name</h6></th>  <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{Orders.customer.lastName}</Typography></td><td></td>
              </tr>

              <tr>
                <th style={{minWidth:'240px'}}><h6 style={{marginLeft:'15px'}}>Gender</h6></th>   <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{Orders.customer.gender === null || Orders.customer.gender === '' ? 'not specified': Orders.customer.gender}</Typography></td><td style={{minWidth:'130px'}}></td>
              </tr>
              <tr>
                <th><h6 style={{marginLeft:'15px'}}>Email</h6></th>   <td><Typography  variant="body2" style={{color:'grey'}} component="h6">{Orders.customer.email}</Typography></td><td></td>
              </tr>

              <tr>
                <th><h6 style={{marginLeft:'15px'}}>Phone</h6></th>  <td><Typography  variant="body2"  style={{color:'grey'}} component="h6">{Orders.customer.email}</Typography></td><td></td>
              </tr>
          </table>
    
  
    }
    </div>
    )
}

export default CustomerDetails
