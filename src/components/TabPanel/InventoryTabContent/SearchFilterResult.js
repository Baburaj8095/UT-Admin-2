import React ,{useState}from 'react';
import { Box, Card, CardContent, Grid, IconButton, TextField, Tooltip } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import axios from 'axios';
import { useHistory } from 'react-router';

import moment from 'moment';
import { reactLocalStorage } from 'reactjs-localstorage';
import AddInventoryModal from './AddInventoryModal';
import EditInventoryModal from './EditInventoryModal';
import NodataFound from './NodataFound';
import NoSearchFound from './NoSearchFound';
import Footer from '../../Footer/Footer';


const useStyles = makeStyles((theme) => ({
    theCard:{
        // maxWidth:450,
        // maxHeight: 400,
        // minHeight: 280,
        // minWidth: 450,
        width: 450,
        height: 280,
        margin: 9.8,
    },
  table: {
     //maxWidth: 650,
    textAlign:'center'
  },
  toolbar: {
    flexGrow: 1,
    maxHeight:'30px',
    backgroundColor:'white',
    color: 'black'
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },

  
}));




const SearchFilterResult = (props) => {

    const classes = useStyles();

    const   history = useHistory();

    const {invDATA, searchWORD} = props;

    //api deatils
//get tomorrow's date
    var d = new Date();
    d.setDate(d.getDate() + 1)

    //console.log("tomorrow's date: ", moment(d).format('YYYY-MM-DD'));

   const [deliveryDate, setDeliveryDate] = useState( moment(d) );
  
   const chosenDeliveryStartDate = moment(deliveryDate).format('YYYY-MM-DD')+"T00:00:00.000Z";
   console.log("tomorrow's date: ", chosenDeliveryStartDate);

   //api for product inventories
   const countryClode= reactLocalStorage.getObject("regionID");
   console.log(countryClode.id);
   const regionCode = Number(countryClode.id); //check login.js or set it up there in localStorage
   const api = "/product-inventories/details/"+chosenDeliveryStartDate+"/"+regionCode;
   //const jwt = reactLocalStorage.get('id_token');
   const token = reactLocalStorage.get('id_token');
   const jwtToken ='Bearer '+token;


      //////////////////////////////////////////      modal setUp starts     ///////////////////////////////////////////////////

      const [openModal, setOpenModal] = useState(false);
      const [ModalData, setModalData] = useState({});
  //for AddInventoryModal.js
      const openModalWithInvId = (inv_ID, prod_ID, product_Name, unit_Name, unit_Price, stock, unit_Value,total_ID, isModal_Open) =>{
  
              setOpenModal(isModal_Open);
  
              setModalData({invId:inv_ID, prodID:prod_ID,
                  prodName: product_Name, unitName: unit_Name, 
                  unitPrice: unit_Price, Stock: stock,
                  unitValue:unit_Value, regionID:regionCode,
                  totalStockID: total_ID
                  });
  
                                                     
      }
  
  
      //for EditInventoryModal.js
      const [openEditModal, setOpenEditModal] = useState(false);
  
      const openEditModalWithInvId = (inv_ID, prod_ID, product_Name, unit_Name, unit_Price, stock, unit_Value,total_ID, isModal_Open) =>{
  
          setOpenEditModal(isModal_Open);
  
          setModalData({invId:inv_ID, prodID:prod_ID,
              prodName: product_Name, unitName: unit_Name, 
              unitPrice: unit_Price, Stock: stock,
              unitValue:unit_Value, regionID:regionCode,
              totalStockID: total_ID
              });
  
                                                 
  }
  
      //delete an inventory
      const removeProductHandler = (inventoryID, totalInvID) =>{
          const invDeleteAPI = "/product-inventories/"+inventoryID;
          const productTotalInvDeleteAPI = "/product-total-inventories/"+totalInvID;
          const confirmation = window.confirm("Are you sure you want to delete this inventory?");
          if(confirmation){
              axios.delete(invDeleteAPI, {
                          headers: {
                          'Authorization': jwtToken,
                          'Accept' : '*/*',
                          'Content-Type': 'application/json',
                          'App-Token' : 'A14BC'
                          }
                  }).then(res=> {
  
                      axios.delete(productTotalInvDeleteAPI, {
                          headers: {
                          'Authorization': jwtToken,
                          'Accept' : '*/*',
                          'Content-Type': 'application/json',
                          'App-Token' : 'A14BC'
                          }
                  }).then(res=>{
                          console.log("Deleted successfully");
                          //window.location.reload();
                          history.push("/homepage");
                      })
  
  
                  }).catch(error=> window.alert("something went wrong! Try again."))
          }
      }



//filtered content to be rendered
let isPresent = false;
    const searchedContent = invDATA.filter((val) =>{
        if(searchWORD === '' || searchWORD === ' '){
            isPresent = false
            return val;
        }else if(val.name.toLowerCase().includes(searchWORD.toLowerCase())){
            isPresent = true;
            return val;
        }
    } )
    .map(res=>{

    if(res){
     return(                           
        <Grid item sm={3} xs={3} lg={3} key={res.id}> 
               <Card className={classes.theCard} key={res.id} >

                    <CardContent>
                        <Table className={classes.table} >
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={5}>

                                            <Box className={classes.toolbar}>
                                                <Grid container>

                                                    <Grid item xs style={{width:'80px'}}>

                                                        <Typography variant="h6" className={classes.title}>
                                                            {res.name}
                                                        </Typography>
                                                        
                                                    </Grid>

                                                    <Grid item >
                                                        <Tooltip title="Add" arrow  placement="top">
                                                                <IconButton style={{color:'green'}}>
                                                                    <AddCircleOutlineIcon onClick={ (event) =>openModalWithInvId(res.id,res.productId, res.name, res.unitName, res.price, res.stock,res.unitValue,res.totalId, true) }/>
                                                                </IconButton>                                          
                                                        </Tooltip>                                                  
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                        </TableCell>
                                    </TableRow>

                                    <TableRow> 
                         
                                        <TableCell >Unit</TableCell>                       
                                        <TableCell >Price</TableCell>
                                        <TableCell colspan={1} >Stock</TableCell>
                                        <TableCell colspan={2} >Delivery Date</TableCell>
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    
                                        <TableRow>
                                            <Tooltip title="edit"
                                            placement="right"
                                            arrow
                                            PopperProps={{
                                                popperOptions: {
                                                    modifiers: {
                                                    offset: {
                                                        enabled: true,
                                                        offset: '1px, -20px',
                                                        },
                                                    },
                                                    },
                                                }}
                                                >
                                                <TableCell style={{color:"blue", border:'0px', cursor:'pointer'}} onClick={ (event) =>openEditModalWithInvId(res.id,res.productId, res.name, res.unitName, res.price, res.stock,res.unitValue,res.totalId, true) }>{res.unitName}</TableCell>                                                         
                                            </Tooltip>
                                            
                                            <TableCell style={{border:'0px solid grey'}}>{res.price}</TableCell>
                                            <TableCell style={res.stock === 0 ? {border:'0px solid grey', color:'red'} : {border:'0px solid grey', color:'green'} }>{res.stock}</TableCell>
                                            <TableCell style={{border:'0px solid grey'}}>{moment(res.date).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell style={{border:'0px solid grey'}}>
                                                <Tooltip  title="Remove" arrow  placement="right">
                                                    <IconButton  style={{color:'red'}}>
                                                        <RemoveCircleOutlineIcon
                                                                onClick={(event)=>removeProductHandler(res.id, res.totalId)} 
                                                                />
                                                    </IconButton>                                          
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                        
                                </TableBody>
                            </Table>
                            </CardContent>
                        </Card>
                </Grid> 

                )
            
            }else{

            return null;

            }           
        }

    )



    return (
        <div>
            { !isPresent ? <NoSearchFound /> : searchedContent }

                <AddInventoryModal 
                    openModal={openModal}
                    setOpenModal = {setOpenModal}
                    modal_data={ModalData}
                />

                <EditInventoryModal
                    openEditModal={openEditModal}
                    setOpenEditModal = {setOpenEditModal}
                    modal_data={ModalData}

                    />
                     
        </div>
    );
}


export default SearchFilterResult;
