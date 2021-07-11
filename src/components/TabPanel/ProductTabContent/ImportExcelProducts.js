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
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import { useHistory } from 'react-router';
import * as XLSX from 'xlsx';
import ParsedExcelDataTable from './ParsedExcelDataTable';

const styles = (theme) => ({
  dialogPaper: {
       
    height : '400px'
},
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


const useStyles = makeStyles(theme => ({
  dialogPaper: {
     
      height : 'auto',
      minWidth:'1050px'
  },
}));


const ImportExcelProducts = (props) => {

  const   history = useHistory();


  const {openModal, setOpenModal} = props;


   
    //now get the inventory details for the priduct id
    
    const [body, setbody] = useState([]);

const handleExcelImport = (file)=>{
            const promise = new Promise((resolve, reject) =>{

                const fileReader = new FileReader();
                fileReader.readAsArrayBuffer(file);

                fileReader.onload = (e) =>{
                  const bufferArray = e.target.result;
                  const workBook = XLSX.read(bufferArray, {type:'buffer'});

                  const workSheetName = workBook.SheetNames[0];

                  const workSheet = workBook.Sheets[workSheetName];

                  const data  = XLSX.utils.sheet_to_json(workSheet);
                  resolve(data);
              };
              fileReader.onerror = (error) =>{
                reject(error);
              };

            });


            promise.then((d =>{
              setbody(d);
        }))   
        
}
 

 //modal close handler
 const handleClose = () => {   
  setOpenModal(false);
  setbody([]);
};



 //api
 const api = "/products";

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



  //submit the excel data

  // body for product post

  // {
  //   "name": "Mango Juice",
  //   "description": "mango juice",
  //   "productImage": "https://unsplash.com/photos/2TxmAfd3bxU",
  //   "archieved": false,
  //   "rank":3, parseInt
  //   "dateInventory":true,
  //   "productCategory": {
  //       "id":1752
  //     }
  //   }
const submitData=()=>{

   if(body != null)
      { 
        
        body.map((res, index, {length}) => {

              //POST request body
              const product = {
                                name: res.prod_name,
                                description: res.description,
                                productImage : res.productImage,
                                archieved: res.archieved,
                                rank: parseInt(res.rank),
                                dateInventory: res.dateInventory,
                                productCategory: {
                                                    id: parseInt(res.product_category_id)//parseInt(reactLocalStorage.get('category_id'))
                                                }
                            }

           console.log("product from the loop: ", product);

            axios.post(api,
                      product,
                      {headers: headerObject} 
                      )
                      .then(response=>{
                          console.log("submitted excel products: "+response.data);
                            if((index + 1) === length)
                              {
                                 history.push("/homepage");
                                 setOpenModal(false);

                              }
                        }
                        ).catch((error)=>{
                          console.log("error while posting data: ",error);
                        });

          });//map func


                           
        } 
  
}



const classes = useStyles();



  return (
    <div style={{height:'100%', width:'200%'}}>
      <Dialog classes={{ paper : classes.dialogPaper}} onClose={handleClose} aria-labelledby="customized-dialog-title" open={openModal}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Import Excel Data
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            type="file"
            margin="dense"
            id="fileUpload"
            label="Excel File"      
            placeholder="Upload your excel file here...."

            onChange={(e) => { 
              const file = e.target.files[0];
              handleExcelImport(file) ;
              }}
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
          />
          {body ? <ParsedExcelDataTable tableDATA = {body} style={{marginTop:'30px'}}/> : null}
           
        </DialogContent>
        {/*use the below actions on collapsed dialogue */}
        { 
            body ? <DialogActions>
                    <Button onClick={submitData} style={{color:'green'}}>
                      Save
                    </Button>
                    <Button onClick={handleClose} style={{color:'red'}}>
                      Cancel
                    </Button>
                  </DialogActions>

                 : null
        }

      </Dialog>
    </div>
  );
}


export default  ImportExcelProducts;