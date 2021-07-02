import { Card, CardContent, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import Auxiliary from '../../../../hoc/Auxiliary';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
     
      maxWidth: 345,
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

    return (
        <div style={{marginLeft:'10px'}}>                                  

                <div  style={{overflowY:'auto',display:'flex'}}>

                  
                      
                    {
                      OrderItems.orderItems && OrderItems.orderItems.map(res=>{
                        return(
                          <Auxiliary>

<Card className={classes.root}>
      <CardActionArea style={{    position: 'initial'}}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
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
         Delivery Date : {res.deliveryDate}
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
</Auxiliary>
                         
                        )
                    })
                    }

                         
                    </div>

                                        
       
    </div>
    )
}

export default OrderItems;
