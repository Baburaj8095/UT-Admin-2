import { Card, CardContent, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import Auxiliary from '../../../../hoc/Auxiliary';



const useStyles = makeStyles((theme) => ({
    root: {
      width: 650,
      height:900,
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
      minWidth: 710,
      minHeight:424,
      },
      dataRows:{
          height: 93,
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
  

const OrderItems = (props) => {

    const OrderItems = props.OrderItem;

    const classes = useStyles();   

    return (
        <div style={{marginLeft:'65px'}}>                                  
                <CardContent className={classes.root}>

                <Paper className={classes.paper}>
                <div  style={{overflowY:'auto',width:'710px',height:'423px'}}>

                    <Table >
                        <TableHead>
                        <TableRow style={{backgroundColor:'#E6E6FA', textAlign:'center', overflow:'scroll'}}>
                            <TableCell style={{fontSize:'17px'}}>Customer Name</TableCell>
                            <TableCell style={{fontSize:'17px'}} component="th">Unit Name</TableCell>
                            <TableCell style={{fontSize:'17px'}} component="th">Quantity</TableCell>
                            <TableCell style={{fontSize:'17px'}} component="th">Price</TableCell>

                            <TableCell style={{fontSize:'17px'}} component="th">Total Price</TableCell>
                        </TableRow>
                     </TableHead>
                    <TableBody>
                      
                    {
                      OrderItems.orderItems && OrderItems.orderItems.map(res=>{
                        return(
                          <Auxiliary>
                              
                            <TableRow key={res.name} className={classes.dataRows}>
                              <TableCell cocomponent="th">{res.name}</TableCell>
                              <TableCell cocomponent="th">{res.unitName}</TableCell>
                              <TableCell cocomponent="th">{res.quantity}</TableCell>
                              <TableCell cocomponent="th">{res.unitPrice}</TableCell>
                              <TableCell cocomponent="th">{res.totalPrice}</TableCell>                       
                            </TableRow>
                          </Auxiliary>
                         
                        )
                    })
                    }

                          <TableRow >
                            <TableCell rowSpan={4} />
                            <TableCell rowSpan={4} />
                            <TableCell rowSpan={4} />
                            <TableCell align="right">Total before discount:</TableCell>
                            <TableCell cocomponent="td">{OrderItems.totalBeforeDiscount}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell align="right">Total tax:</TableCell>
                            <TableCell cocomponent="th">{OrderItems.totalTax}.00</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell align="right">Discount:</TableCell>
                            <TableCell cocomponent="th">{OrderItems.discount}.00</TableCell>
                          </TableRow>
                                    
                    </TableBody>
                  
                    </Table>
                    </div>
                </Paper>

            </CardContent>
                                        
       
    </div>
    )
}

export default OrderItems;
