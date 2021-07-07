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




const EditInventoryModal = (props) => {
  const   history = useHistory();


  const {openEditModal, setOpenEditModal, modal_data} = props;
 
  //modal close handler
  const handleClose = () => {
    setOpenEditModal(false);
  };

      

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

        

//get tomorrow's date
var d = new Date();
d.setDate(d.getDate() + 1);

const date= moment(d);

//product-inv body to create a new record
//PUT
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

//check if the selected date is already present for the prod_id
const checkInventoryAPI= "/product-inventories/product/"+addInventoryBodyData.date+"/"+addInventoryBodyData.regionId+"/"+addInventoryBodyData.product.id;


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

// https://ecom.xircular.io/test/api/product-total-inventories
// PUT
// {
//     id: body.totalId,
//     product: {
//         id: Number(body.product.id)
//     },
//     regionCluster: {
//         id: Number(body.regionId)    
//     },
//     totalStock: parseInt(body.totalStock),
//     date: moment(date).format('YYYY-MM-DD')+'T00:00:00Z' //date can't be updated
// }
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

    //check if the selected date is already present for the prod_id
  axios.get(checkInventoryAPI,
              {headers: headerObject} 
            )
          .then(response=>{
              console.log("does inventory exist: "+response.data);
                if(response.data.productInventory.length !== 0 && response.data.productTotalInventory !== null){

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
                         setOpenEditModal(false);
                         //history.push("/homepage");

                           }
                       )



                  }//end of if


            }
              )//first axios get req

}
            


  return (
    <div >
      <Dialog  onClose={handleClose} aria-labelledby="customized-dialog-title" open={openEditModal}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Update Inventory
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
            inputProps={
                { readOnly: true, }
              }
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

           
        </DialogContent>
        <DialogActions>
          <Button onClick={submitData} style={{color:'green'}}>
            Update
          </Button>
          <Button onClick={handleClose} style={{color:'red'}}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default  EditInventoryModal;