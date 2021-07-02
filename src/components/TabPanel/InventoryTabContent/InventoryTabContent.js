import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

 import 'react-date-range/dist/styles.css'; // main css file
 import 'react-date-range/dist/theme/default.css'; // theme css file
 import moment from 'moment';
 import axios from 'axios';
 import { reactLocalStorage } from 'reactjs-localstorage';
 import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, Card, CardContent, Grid, IconButton, Tooltip } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Paginator from 'react-paginate';

import InventoryTabContentCss from './InventoryTabContent.module.css';
import Spinner from '../../Spinner/Spinner';
import Footer from '../../Footer/Footer';
import AddInventoryModal from './AddInventoryModal';


//RICHPOST DATEPICKER
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';

// DatePicker
import {DatePicker } from 'antd';
import "antd/dist/antd.css";

import Auxiliary from '../../../hoc/Auxiliary';
import { useHistory } from 'react-router';
import NodataFound from './NodataFound';

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




const InventoryTabContent =()=> {

  //handle logout
const   history = useHistory();

if(reactLocalStorage.get('id_token') == null || reactLocalStorage.get('id_token') === ''){
  history.push('/');
    }

  const classes = useStyles();

  const [isLoading, setisLoading] = useState(true);


 
 ///////////////////////////////////////// datepicker start
    //get tomorrow's date
    var d = new Date();
    d.setDate(d.getDate() + 1)

    //console.log("tomorrow's date: ", moment(d).format('YYYY-MM-DD'));

   const [deliveryDate, setDeliveryDate] = useState( moment(d) );
  
   const chosenDeliveryStartDate = moment(deliveryDate).format('YYYY-MM-DD')+"T00:00:00.000Z";
   console.log("tomorrow's date: ", chosenDeliveryStartDate);

   const token = reactLocalStorage.get('id_token');
   //api for product inventories
   let regionCode = 1050; //check login.js or set it up there in localStorage
   const api = "/product-inventories/"+chosenDeliveryStartDate+"/"+regionCode;
   //const jwt = reactLocalStorage.get('id_token');
   const jwtToken ='Bearer '+token;
  
   const [InventoryData, setInventoryProducts] = useState([]);

  useEffect( () =>{
      axios.get(api, {
              headers: {
              'Authorization': jwtToken,
              'Accept' : '*/*',
              'Content-Type': 'application/json',
              'App-Token' : 'A14BC'
                }
              })
              .then(inv =>{

                setInventoryProducts(inv.data);
                console.log("inventories based on the date: ",inv.data);
                setisLoading(false);

                return inv;
              })
    },[api, jwtToken]);

    
    //pagination setup starts
    const [pageNumber, setPageNumber] = useState(0);

    //method to change the paginator number
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }

    let itemsPerPage = 6;

    // if(products.length <=5){
    //     itemsPerPage = 11;
    // }else{
    //     itemsPerPage = 14;
    // }

    const pagesVisited = pageNumber * itemsPerPage;

    const pageCount = Math.ceil(InventoryData.length / itemsPerPage);
    
    console.log("pagesVisited: "+pagesVisited+", pageCount: "+pageCount);
    //pagination setup ends


    //////////////////////////////////////////      modal setUp starts     ///////////////////////////////////////////////////

    const [openModal, setOpenModal] = useState(false);

    const openModalWithInvId = (inv_ID, prod_ID, product_Name, unit_Name, unit_Price, stock, unit_Value, region_ID, isModal_Open) =>{

            setOpenModal(isModal_Open);

            reactLocalStorage.setObject('inventory_details',{invId:inv_ID, prodID:prod_ID,
                                                             prodName: product_Name, unitName: unit_Name, 
                                                             unitPrice: unit_Price, Stock: stock,
                                                             unitValue:unit_Value, regionID:region_ID
                                                            });
    }

    const removeProductHandler = () =>{
        const confirmation = window.confirm("Are you sure you want to remove a unit of this product from the inventory?");
        console.log("do you want to delete this item from thr inventory? ", confirmation);
    }


    let InventoryItems = '';  

    if(isLoading){
        InventoryItems = <Spinner />;
    }else{

        InventoryItems = InventoryData.slice(pagesVisited, pagesVisited + itemsPerPage )
                            .map(res=>{

                                if(res){
                                
                                    return(                           
                                        //  <Grid item  sm={6} xs={12} lg={4} key={res.id}> 
                                            // <TableContainer component={Card} className={classes.theCard}>
                                        <Card className={classes.theCard} key={res.id} >

                                            <CardContent>
                                                <Table className={classes.table} >
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell colSpan={4}>

                                                                    <Box className={classes.toolbar}>
                                                                        <Grid container>

                                                                            <Grid item xs style={{width:'80px'}}>

                                                                                <Typography variant="h6" className={classes.title}>
                                                                                    {res.product.name}
                                                                                </Typography>
                                                                                
                                                                            </Grid>

                                                                            <Grid item >
                                                                                <Tooltip title="Add" arrow  placement="top">
                                                                                        <IconButton style={{color:'green'}}>
                                                                                            <AddCircleOutlineIcon onClick={ (event) =>openModalWithInvId(res.id,res.product.id, res.product.name, res.unitName, res.price, res.stock,res.unitValue,res.regionId, true) }/>
                                                                                        </IconButton>                                          
                                                                                </Tooltip>                                                  
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Box>

                                                                </TableCell>
                                                            </TableRow>

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
                                                                    <TableCell style={{color:"blue", cursor:'pointer'}} onClick={ (event) =>openModalWithInvId(res.id, res.product.name, true) }>Unit</TableCell>                                                         
                                                                </Tooltip> 
                                                                                                           
                                                                <TableCell >Price</TableCell>
                                                                <TableCell colspan={1} >Stock</TableCell>
                                                                <TableCell style={{color:'grey'}}>{moment(res.date).format('YYYY-MM-DD')}</TableCell>
                                                                
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            
                                                                <TableRow>
                                                                    <TableCell style={ {border:'0px solid grey'}}>{res.unitName}</TableCell>
                                                                    <TableCell style={{border:'0px solid grey'}}>{res.price}</TableCell>
                                                                    <TableCell style={res.stock === 0 ? {border:'0px solid grey', color:'red'} : {border:'0px solid grey', color:'green'} }>{res.stock}</TableCell>
                                                                    <TableCell style={{border:'0px solid grey'}}>
                                                                        <Tooltip  title={res.stock === 0 ? "not allowed" : "Remove"} arrow  placement="right">
                                                                            <IconButton  style={{color:'red'}}>
                                                                                <RemoveCircleOutlineIcon
                                                                                        onClick={removeProductHandler} 
                                                                                        style={res.stock === 0 ? {cursor:'not-allowed',pointerEvents:'none'} : {cursor: 'pointer'} }
                                                                                        />
                                                                            </IconButton>                                          
                                                                        </Tooltip>
                                                                    </TableCell>
                                                                </TableRow>
                                                                
                                                        </TableBody>
                                                    </Table>
                                                    </CardContent>
                                                </Card>
                                           /* </TableContainer> */
                                      /*  </Grid> */ 
                

                                    )
                                    
                                    

                            }else{ 
                            return null
                            }                            
                                
                                        
                                })//end of map

    }//end of else




  return (
    <Auxiliary>
      
    <div style={{display:'flex'}}>
    
            <div style={{display:'flex', position:'fixed',marginLeft:'8px', marginTop:'30px'}}>
                <div>
                    <h5>All Inventories</h5>
                </div>         
            
                <div style={{ marginTop:'4px', marginLeft:'900px',marginRight:'8px', float:'right'}}>
                    <h6>Date: </h6>
                </div>

                <div style={{ float:'right'}}>
                        <DatePicker 
                            style={{width:'309px',height: '43px', borderRadius:'4px', border:'2px solid #DAF7A6'}}
                            value={deliveryDate}
                            onChange={(newValue) => {
                            setDeliveryDate(newValue);
                            }}
                        />                          
                </div>
            </div>
          


    {/*///////////////// body content /////////////// pagesVisited /*/}
        <div style={{marginTop:'100px', width:'100%'}}>
          <div style={ pagesVisited === 18 ? {overflow:'hidden',width:'98%', height:'480px'} : {overflow:'scroll',overflowX:'hidden', height:'480px'}}>
           
{InventoryData.length !== 0 ?  <div>
                                    <Grid container  style={{margin:'5px', justifyContent: 'center'}}>
                                        {InventoryItems}           
                                    </Grid>

                                    <AddInventoryModal 
                                        openModal={openModal}
                                        setOpenModal = {setOpenModal}
                                    />

                                    <Paginator
                                        previousLabel = {"<"}
                                        nextLabel = {">"}
                                        pageCount = {pageCount}
                                        onPageChange = {changePage}
                                        containerClassName={InventoryTabContentCss.paginationButtons}
                                        previousLinkClassName = {InventoryTabContentCss.previousButton}
                                        nextLinkClassName={InventoryTabContentCss.nextButton}
                                        disabledClassName = {InventoryTabContentCss.paginationDisabled}
                                        activeClassName = {InventoryTabContentCss.activePageNumberButton}                  
                                        />
                                        
                                    <div style={ pagesVisited === 18 ? {backgroundColor: 'grey', color:'white',  width:'100%', marginTop:'45px', bottom:0, height:'140px'}: {backgroundColor: 'grey', color:'white',  width:'98%', marginTop:'45px', bottom:0, height:'140px'}}>
                                            <Footer />
                                    </div>
                                </div>
                      :<NodataFound /> 
                }
          </div>
        </div>

        {/* <div style={{backgroundColor: 'grey', color:'white', position:'fixed', width:'97%',bottom:0, height:'130px'}}>
              <Footer />
        </div> */}

</div>

            
    </Auxiliary>
  );
}


export default InventoryTabContent;