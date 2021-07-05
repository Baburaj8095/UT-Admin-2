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




const AddInventoryModalProductPage = (props) => {
  const   history = useHistory();


  const {openModal, setOpenModal} = props;


  //modal close handler
  const handleClose = () => {   
    setOpenModal(false);
  };



//get tomorrow's date
var d = new Date();
d.setDate(d.getDate() + 1);

const [date, setDate] = useState(moment(d));
//check if the selected date is already present for the prod_id



    const countryClode= reactLocalStorage.getObject("regionID");
    const regionCode = Number(countryClode.id);
    
    const theData=reactLocalStorage.getObject("productData");

    const product_id= theData.Pid;
    const product_name=theData.Pname;
    console.log(product_id, product_name);
   
    //now get the inventory details for the priduct id
    
    const [body, setbody] = useState({
                                    inventoryId: null,
                                    price: null,
                                    product:{
                                        id: Number(product_id)
                                    },
                                    productName: product_name,
                                    regionId: Number(regionCode),
                                    stock: null,
                                    unitName: null,
                                    unitValue: null,

                                    totalStock:0,
                                    totalId: null
   
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



//product-inv body to create a new record
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

let prodID = null;
let totalProductInvID = null;


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


//check the inventory data for the product with the product id
const productInventoryFetchApi = "/product-inventories/product/"+addInventoryBodyData.date+"/"+regionCode+"/"+product_id;

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

// product-total-inventory update for inner else part



//submit the form data
const submitData=()=>{

  //checking if the date is already present for the product inv
  axios.get(productInventoryFetchApi,
              {headers: headerObject} 
            )
          .then(response=>{
              console.log("does inventory exist: "+response.data);
              
                if(response.data.productInventory.length !== 0 && response.data.productTotalInventory !== null){
                   //to be used for the product-total-inv update
                    totalProductInvID = response.data.productTotalInventory.id;
                    const totalProdStock = response.data.productTotalInventory.totalStock;
                    
                      
                  let found = false;
                      for(var i = 0; i < response.data.productInventory.length; i++) {

                          if (response.data.productInventory[i].unitName.toLowerCase() === body.unitName.toLowerCase()) {
                              found = true;

                            //storing the data in a useState hook
                              prodID = response.data.productInventory[i].id;
                              const totalCalc = totalProdStock - response.data.productInventory[i].stock;
                              console.log("prodInvID: ", response.data.productInventory[i].id);
 response.data.productInventory[i].id && setbody({
                                                          inventoryId: response.data.productInventory[i].id,
                                                          price: body.price,
                                                          product:{
                                                              id: Number(product_id)
                                                          },
                                                          productName: product_name,
                                                          regionId: Number(regionCode),
                                                          stock: body.stock,
                                                          unitName: body.unitName,
                                                          unitValue: body.unitValue,

                                                          totalStock: parseInt(body.totalStock) + totalCalc,
                                                          totalId: totalProductInvID

                                                        })
                                console.log("productInvBodyToUpdate", productInvBodyToUpdate);
                                console.log("productTotalInvBodyToUpdate", productTotalInvBodyToUpdate);


                              //now update the product-inventory and product-total-inventory
                               const editConfirmation= window.confirm("Inventory for the product with the selected date and unit name already exists. You can proceed for an update or choose a different date to add new inventory details.")
                                 
                                 if(editConfirmation){

                                      //product inventory update
                                        axios.put(productInvPutAPI,
                                          productInvBodyToUpdate,
                                          {headers: headerObject} 
                                          )
                                        

                                        //product-total-inventory update
                                        axios.put(productTotalInvPutAPI,
                                          productTotalInvBodyToUpdate,
                                          {headers: headerObject} 
                                          )
                                        .then(response=>{
                                            console.log("updated product total inventory details: "+response.data);
                                            setOpenModal(false);
                                            //history.push("/homepage");
                    
                                              }
                                          ).catch(error=>{
                                              window.alert("something went wrong while updating! Please try again")
                                              //history.push("/homepage")
                                            })     
                                  }  // window.alert if closing                       
                            break;
                          }

                      }//end of for loop
              
              // if there is no match for the entered unit name in the Databs
              // but the date is present so create a new unit with the same date  and update   the tproduct-total-inv
             
              const productTotalInvBodyToUpdate2 = {
                                                  id: totalProductInvID,
                                                  product: {
                                                      id: Number(body.product.id)
                                                    },
                                                  regionCluster: {
                                                      id: Number(body.regionId)    
                                                    },
                                                  totalStock: parseInt(body.totalStock)+totalProdStock,
                                                  date: moment(date).format('YYYY-MM-DD')+'T00:00:00Z' //date can't be updated
                                            }

                  if(!found){

                        setbody({
                          inventoryId: null,
                          price: body.price,
                          product:{
                              id: Number(product_id)
                          },
                          productName: product_name,
                          regionId: Number(regionCode),
                          stock: body.stock,
                          unitName: body.unitName,
                          unitValue: body.unitValue,

                          totalStock:body.totalStock,
                          totalId: totalProductInvID

                        })

                        //post request for a new product-inv
                          axios.post(productPostAPI,
                            addInventoryBodyData,
                            {headers: headerObject} 
                          )
                          .then(response=>{
                            console.log("created inventory details: "+response.data);                            
                            }
                          ) 
                            //product-total-inventory update.  updating product-total-inventory for the exisiting date but for a new product-inv unitname
                          axios.put(productTotalInvPutAPI,
                            productTotalInvBodyToUpdate2,
                            {headers: headerObject} 
                            )
                          .then(response=>{
                              console.log("updated product total inventory details: "+response.data);
                              setOpenModal(false);
                              //history.push("/homepage");

                                }
                            ).catch(error=>{
                                window.alert("something went wrong while updating in the else part where no match was found! Please try again")
                                //history.push("/homepage")
                              }) 
                      }//closing of if
                          
                  }else{ //parent else

                    
                    //post request for a new product-inv
                    axios.post(productPostAPI,
                      addInventoryBodyData,
                      {headers: headerObject} 
                    )
                    .then(response=>{
                      console.log("created inventory details: "+response.data);                            
                      }
                    ) 
                      //post request for a new product-total inventory
                      axios.post(productTotalPostAPI,
                                totalProductInventory,
                                {headers: headerObject} 
                              )
                            .then(response=>{
                                console.log("submitted product-total-inventory details: "+response.data);
                                setOpenModal(false);
                                //history.push("/homepage");
                                  }
                              ).catch(error=>{
                                window.alert("something went wrong! Please try again")
                                //history.push("/homepage")
                              }) 
                    
                  }


            }
              ).catch(error=>{
                window.alert("something went wrong! Please try again")
              }) //first axios get req

}
            




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


export default  AddInventoryModalProductPage;