import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { reactLocalStorage } from 'reactjs-localstorage';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';

// DatePicker
import {DatePicker } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import axios from 'axios';


const styles = (theme) => ({
  modal: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.modal} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton  className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  modal: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


const DialogActions = withStyles((theme) => ({
  modal: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);




const AddInventoryModal = (props) => {


  const {openModal, setOpenModal} = props;

  //modal close handler
  const handleClose = () => {
    setOpenModal(false);
  };

      

//reactLocalStorage.setObject('invenotry_details',{invId:invID, prodName:  productName});

//retrieve data from localstorage
    // invId:inv_ID, prodID:prod_ID,
    // prodName: product_Name, unitName: unit_Name, 
    // unitPrice: unit_Price, Stock: stock,
    // unitValue:unit_Value, regionID:region_ID
const prod_data = reactLocalStorage.getObject('inventory_details');

 //body
 const [body, setbody] = useState({
                                    inventoryId: prod_data.invId,
                                    price: parseInt(prod_data.unitPrice),
                                    product:{
                                        id: prod_data.prodID
                                      },
                                    productName:prod_data.prodName,
                                    regionId: parseInt(prod_data.regionID),
                                    stock: parseInt(prod_data.Stock),
                                    unitName: prod_data.unitName,
                                    unitValue: parseInt(prod_data.unitValue),

                                    totalStock:0,
                                   
                                    });


 const handleFormInput = (e) =>{
  const newData= {...body};
  newData[e.target.id] = e.target.value;
  setbody(newData);
  console.log("inventory form data:",newData);

 }

 //validating the totalStock EX: unitValue=5, stock=10, totalStock = unitValue * stock
 const unitVal = Number(body.unitValue);
 const stockVal = Number(body.stock);
 const totalEnteredSTOCK = Number(body.totalStock);
 const correct_total_stock = unitVal * stockVal;

 const isCorrect = totalEnteredSTOCK === correct_total_stock;

 let alStockErrorMessage ='';
 
 alStockErrorMessage= <p style={{color:'green'}}>Correct!</p>;
if(isCorrect){

  alStockErrorMessage =''// <p style={{color:'green'}}>correct <strong>!</strong></p>

}else{
  alStockErrorMessage = <p style={{color:'red'}}>incorrect total stock</p>
}

  //id_token in the localStorage
  const id_token= reactLocalStorage.get('id_token');

 //jwt token
 const jwtToken ='Bearer '+id_token;

 const headerObject = {
  'Authorization': jwtToken,
  'Accept' : '*/*',
  'Content-Type': 'application/json',
  'App-Token' : 'A14BC'
}
 //if success != 200 then do PUT and setIsModalOpen to false in the else condition


          
//for adding new inventory
//POST
//CHCECK THE INVENTORY IS EXIST, IF EXISTS THEN UPDATE(PUT) ELSE NEW POST
// https://ecom.xircular.io/test/api/product-inventories
//  {
//   "price": 15.00,
//   "product": {
//     "id": 3741
//   },
//   "regionId": 1050,
//   "stock": 100,
//   "unitName": "1 jar",
//   "unitValue": 1.00,
//   "date": "2021-07-02T00:00:00Z"
// }

const [date, setDate] = useState(moment());

const addInventoryBodyData = {
                                  price: body.price,
                                  product: {
                                    id: parseInt(body.product.id)
                                    },
                                  regionId: body.regionId,
                                  stock: parseInt(body.stock),
                                  unitName: body.unitName,
                                  unitValue: parseInt(body.unitValue),
                                  date: moment(date).format('YYYY-MM-DD')+'T00:00:00Z'
                            }
//check if the selected date 
const checkInventoryAPI= "/product-inventories/product/"+addInventoryBodyData.date+"/"+addInventoryBodyData.regionId+"/"+addInventoryBodyData.product.id;

const postAPI = "/product-inventories";

const putAPI = "/product-inventories"
const bodyToUpdate={
          id:body.inventoryId,
          price: body.price,
          product: {
            id: parseInt(body.product.id)
            },
          regionId: body.regionId,
          stock: body.stock,
          unitName: body.unitName,
          unitValue: body.unitValue,
          date: moment(date).format('YYYY-MM-DD')+'T00:00:00Z'
}

const submitData=()=>{

  axios.get(checkInventoryAPI,
              {headers: headerObject} 
            )
          .then(response=>{
              console.log("does inventory exist: "+response.data);
                if(response.data == null){

                    axios.post(postAPI,
                      addInventoryBodyData,
                      {headers: headerObject} 
                      )
                    .then(response=>{
                        console.log("submitted inventory details: "+response.data);
                        setOpenModal(false);
                          }
                      )
                          
                  }else{
                    axios.put(putAPI,
                      bodyToUpdate,
                      {headers: headerObject} 
                      )
                     .then(response=>{
                         console.log("updated inventory details: "+response.data);
                         setOpenModal(false);
                           }
                       )
                  }


            }
              )//first axios get req

}



//for inventory total
// https://ecom.xircular.io/test/api/product-total-inventories
//QUERY THE DATA FROM THE TOTALINVE AND CHCECK IF THE TOTAL_INVE EXISTS OR NOT, IF EXISTS THEN UPDATE ELSE NEW POST
// POST 
// {
//   "product": {
//     "id": 3741
//   },
//   "regionCluster": {
//     "id": 1050    
//   },
//   "totalStock": 200, //( UNIT_VALUE * STOCK) EX:  unitValue=5, stock=10, totalStock = unitValue * stock
//   "date": "2021-07-10T00:00:00Z"
// }            
// 


const totalProductInventory = {
                                product: {
                                      id: body.product.id
                                    },
                                regionCluster: {
                                      id: body.regionId    
                                    },
                                totalStock: body.totalStock  
                              }



  return (
    <div >
      <Dialog  onClose={handleClose} aria-labelledby="customized-dialog-title" open={openModal}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Inventory
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="productName"
            inputProps={
                { readOnly: true, }
              }
            label="Product Name"      
            placeholder="product name...."
            fullWidth
            onChange={(e) => { handleFormInput(e) }}
            defaultValue={body.productName}
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="unitName"
            label="Unit Name"      
            placeholder="unit name...."
            fullWidth
            onChange={(e) => { handleFormInput(e) }}
            defaultValue={body.unitName}
            style={{marginTop:'30px'}}
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
          />

        <TextField
          type="number"
            autoFocus
            margin="dense"
            id="price"
            label="Price"      
            placeholder="price...."
            fullWidth
            onChange={(e) => { handleFormInput(e) }}
            defaultValue={body.price}
            style={{marginTop:'30px'}}
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
          />

        <TextField
          type="number"
            autoFocus
            margin="dense"
            id="stock"
            label="Stock"      
            placeholder="stock...."
            fullWidth
            onChange={(e) => { handleFormInput(e) }}
            defaultValue={parseInt(body.stock)}
            style={{marginTop:'30px'}}
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
          />

          <TextField
            type="number"
            autoFocus
            margin="dense"
            onChange={(e) => { handleFormInput(e) }}
            id="unitValue"
            label="Unit Value"      
            placeholder="unit value...."
            fullWidth
            defaultValue={parseInt(body.unitValue)}
            style={{marginTop:'30px'}}
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
          />
          
          <TextField
            type="number"
            autoFocus
            margin="dense"
            id="totalStock"
            label="Total Stock"      
            placeholder="total stock...."
            fullWidth
            onChange={(e) => { handleFormInput(e) }}
            defaultValue={parseInt(body.totalStock)}
            style={{marginTop:'30px'}}
            size="normal"
            
            helperText={alStockErrorMessage}
            InputLabelProps={{
              shrink: true,
            
            }}
            variant="outlined"
            required
          />
          <DatePicker
              style={{marginTop:'30px',minWidth:'550px',maxWidth:'180px',height: '43px', borderRadius:'4px', border:'2px solid #bfbfbf'}}
              value={date}
              label="Date"
              onChange={(e) => { setDate(e) }}
            /> 
           
        </DialogContent>
        <DialogActions>
          <Button onClick={submitData} style={{color:'green'}}>
            Save
          </Button>
          <Button onClick={handleClose} style={{color:'red'}}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default  AddInventoryModal;