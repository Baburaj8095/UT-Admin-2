import React, { useEffect, useState } from 'react';
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
import { useHistory } from 'react-router';


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
  const   history = useHistory();


  const {openModal, setOpenModal, modal_data} = props;
 
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

    let prod_data=null;
    if(modal_data){
      prod_data = modal_data;
    }


 //body
 const [body, setbody] = useState({
                                    inventoryId: prod_data.invId,
                                    price: parseFloat(prod_data.unitPrice),
                                    product:{
                                        id: Number(prod_data.prodID)
                                      },
                                    productName: prod_data.prodName,
                                    regionId: Number(prod_data.regionID),
                                    stock: Number(prod_data.Stock),
                                    unitName: prod_data.unitName,
                                    unitValue: Number(prod_data.unitValue),

                                    totalStock:0,
                                    totalId: prod_data.totalStockID
                                   
                                    });

// const { path, value, info, update } = props;

// const [val, setVal] = useState(value);
// useEffect(() => { setVal(value)}, [value] )
useEffect(() => { setbody({
                            inventoryId: prod_data.invId,
                            price: parseFloat(prod_data.unitPrice),
                            product:{
                                id: Number(prod_data.prodID)
                              },
                            productName: prod_data.prodName,
                            regionId: Number(prod_data.regionID),
                            stock: Number(prod_data.Stock),
                            unitName: prod_data.unitName,
                            unitValue: Number(prod_data.unitValue),

                            totalStock:0,
                            totalId: prod_data.totalStockID
                          
                            })
                  },[prod_data.Stock,prod_data.invId,
                    prod_data.unitPrice, prod_data.prodID,
                    prod_data.unitName,prod_data.unitValue,
                    prod_data.totalStockID,
                    prod_data.prodName, prod_data.regionID]);

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
//get tomorrow's date
var d = new Date();
d.setDate(d.getDate() + 1);

const [date, setDate] = useState(moment(d));
console.log(date);
//product-inv body to create a new record
//check if the selected date is already present for the prod_id

const addInventoryBodyData = {
                                  price: parseFloat(body.price),
                                  product: {
                                    id: parseInt(body.product.id)
                                    },
                                  regionId: body.regionId,
                                  stock: parseInt(body.stock),
                                  unitName: body.unitName,
                                  unitValue: parseInt(body.unitValue),
                                  date: moment(date).format('YYYY-MM-DD')+'T00:00:00Z'
                            }

const checkInventoryAPI= "/product-inventories/product/"+addInventoryBodyData.date+"/"+addInventoryBodyData.regionId+"/"+addInventoryBodyData.product.id;

const productPostAPI = "/product-inventories";
                            

//product-total-inv body to create a new record
const productTotalPostAPI = "/product-total-inventories";
const totalProductInventory = {
                                product: {
                                      id: Number(body.product.id)
                                    },
                                regionCluster: {
                                      id: Number(body.regionId)    
                                    },
                                totalStock: Number(body.totalStock),
                                date: moment(date).format('YYYY-MM-DD')+'T00:00:00Z'  
                              }

//product-inv update body
const productInvPutAPI = "/product-inventories"
const productInvBodyToUpdate={
          id:body.inventoryId,
          price: parseFloat(body.price),
          product: {
            id: parseInt(body.product.id)
            },
          regionId: body.regionId,
          stock: parseInt(body.stock),
          unitName: body.unitName,
          unitValue: parseInt(body.unitValue),
          date: moment(date).format('YYYY-MM-DD')+'T00:00:00Z' //date can't be updated
}

//product-total-inv update body

const productTotalInvPutAPI = "/product-total-inventories";
const productTotalInvBodyToUpdate = {
                                id: body.totalId,
                                product: {
                                    id: Number(body.product.id)
                                  },
                                regionCluster: {
                                    id: Number(body.regionId)    
                                  },
                                totalStock: parseInt(body.totalStock),
                                date: moment(date).format('YYYY-MM-DD')+'T00:00:00Z' //date can't be updated
                            }

const submitData=()=>{

  axios.get(checkInventoryAPI,
              {headers: headerObject} 
            )
          .then(response=>{
              console.log("does inventory exist: "+response.data);
                if(response.data.productInventory.length === 0 && response.data.productTotalInventory === null){

                  //post request for new product inventory
                    axios.post(productPostAPI,
                              addInventoryBodyData,
                              {headers: headerObject} 
                            )
                          .then(response=>{
                              console.log("submitted inventory details: "+response.data);
                              
                                }
                            )

                      //post request for product-total inventory
                      axios.post(productTotalPostAPI,
                                totalProductInventory,
                                {headers: headerObject} 
                              )
                            .then(response=>{
                                console.log("submitted product-total-inventory details: "+response.data);
                                setOpenModal(false);
                                history.push("/homepage");
                                  }
                              )

                          
                  }else{
                    //product inventory update
                    axios.put(productInvPutAPI,
                      productInvBodyToUpdate,
                      {headers: headerObject} 
                      )
                     .then(response=>{
                         console.log("updated inventory details: "+response.data);
                         
                           }
                       )

                    //product-total-inventory update
                    axios.put(productTotalInvPutAPI,
                      productTotalInvBodyToUpdate,
                      {headers: headerObject} 
                      )
                     .then(response=>{
                         console.log("updated product total inventory details: "+response.data);
                         setOpenModal(false);
                         history.push("/homepage");

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




  return (
    <div >
      <Dialog  onClose={handleClose} aria-labelledby="customized-dialog-title" open={openModal}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Inventory
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            
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
            
            margin="dense"
            id="price"
            label="Price"      
            placeholder="price...."
            fullWidth
            onChange={(e) => { handleFormInput(e) }}
            defaultValue={parseFloat(body.price)}
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
            
            margin="dense"
            id="stock"
            label="Stock"      
            placeholder="stock...."
            fullWidth
            onChange={(e) => { handleFormInput(e) }}
            defaultValue={Number(body.stock)}
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