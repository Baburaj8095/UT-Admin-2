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
import { Box, Card, CardContent, Grid, IconButton, TextField, Tooltip } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Paginator from 'react-paginate';
import SearchIcon from '@material-ui/icons/Search';
import {InputAdornment} from '@material-ui/core';
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
import EditInventoryModal from './EditInventoryModal';
import SearchFilterResult from './SearchFilterResult';

const useStyles = makeStyles((theme) => ({
    theCard:{
         maxWidth:530,
        // maxHeight: 400,
        // minHeight: 280,
        // minWidth: 450,
        //width: 450,
        height: 280,
        margin: 25,
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
   const countryClode= reactLocalStorage.getObject("regionID");
   console.log(countryClode.id);
   const regionCode = Number(countryClode.id); //check login.js or set it up there in localStorage
   const api = "/product-inventories/details/"+chosenDeliveryStartDate+"/"+regionCode;
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



    //search filter input data
    const [searchedWord, setsearchedWord] = useState('');

    const handleOnSearchIconClicked =() =>{
        console.log("searched icon clicked")
    }




    let InventoryItems = '';  

    if(searchedWord && searchedWord !== ' ' && searchedWord !==  null){
        InventoryItems = <SearchFilterResult invDATA={InventoryData} searchWORD={searchedWord}/>;
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
                                                                <TableCell colSpan={7}>

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
                                                                <TableCell colspan={1}>Stock</TableCell>
                                                                <TableCell colspan={2} >Total Stock</TableCell>
                                                                <TableCell colspan={3} style={{minWidth:'190px'}}>Delivery Date</TableCell>
                                                                
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
                                                                        <TableCell  style={{color:"blue", border:'0px',minWidth:'90px', cursor:'pointer'}} onClick={ (event) =>openEditModalWithInvId(res.id,res.productId, res.name, res.unitName, res.price, res.stock,res.unitValue,res.totalId, true) }>{res.unitName}</TableCell>                                                         
                                                                    </Tooltip>

                                                                    <TableCell style={{border:'0px solid grey'}}>{res.price}</TableCell>
                                                                    <TableCell style={res.stock === 0 ? {border:'0px solid grey', color:'red'} : {border:'0px solid grey', color:'green'} }>{res.stock}</TableCell>
                                                                    <TableCell style={res.stock === 0 ? {border:'0px solid grey', color:'red'} : {border:'0px solid grey', color:'green'} }>{res.totalStock}</TableCell>
                                                                    <TableCell></TableCell>
                                                                    <TableCell  style={{border:'0px solid grey'}}>{moment(res.date).format('YYYY-MM-DD')}</TableCell>
                                                                    
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
                                           /* </TableContainer> */
                                      /*  </Grid> */ 
                

                                    )
                                    
                                    

                            }else{ 
                            return null
                            }                            
                                
                                        
                                })//end of map

    }//end of else


//checking internet connection
const [getInternetStatus, setInternetStatus] = useState(true)
    window.addEventListener('offline', function(e) {
        setInternetStatus(false) 
        console.log(getInternetStatus)
    });
        
    window.addEventListener('online', function(e) { 
        setInternetStatus(true);
        console.log(getInternetStatus)

    });

   

  return (
    <Auxiliary>
      
    <div style={{display:'flex'}}>
    
            <div style={{display:'flex', position:'fixed',marginLeft:'8px', marginTop:'30px'}}>
                <div style={{display:'flex'}}>
                    <strong style={{width:'200px'}}>All Inventories</strong>
                    

                    <TextField 
                        style={{marginTop:'-10px',marginLeft :'40px',width:'340px', borderRadius:'4px', border:'2px solid #DAF7A6'}}
                                
                        InputProps={{       
                            
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleOnSearchIconClicked}
                                        edge="end"
                                        >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                                )
                            
                            }}
                        placeholder="search inventory with product name.."
                        variant="outlined"
                        //margin="normal"
                        required
                        size="small"
                        name="search"
                        id="search"
                        value={searchedWord}
                        onChange={(event) =>setsearchedWord(event.target.value)}
                        />

                </div>   
                
                      
            
                <div style={{ marginTop:'5px', marginLeft:'500px',marginRight:'8px', float:'right'}}>
                    <h6>Date: </h6>
                </div>

                <div style={{ float:'right'}}>
                        <DatePicker 
                            style={{marginTop:'-10px', width:'309px',height: '42px', borderRadius:'4px', border:'2px solid #DAF7A6'}}
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
           
{InventoryData.length !== 0 && getInternetStatus === true ?  <div>
                                    <Grid container  style={{margin:'5px', justifyContent: 'center'}}>
                                        {InventoryItems}           
                                    </Grid>

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

                                 { searchedWord ? null : <Paginator
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
                                        
                                    }
                                        
                                    <div style={ pagesVisited === 18 ? {backgroundColor: 'grey', color:'white',  width:'100%', marginTop:'45px', bottom:0, height:'140px'}: {backgroundColor: 'grey', color:'white',  width:'98%', marginTop:'45px',height:'180px'}}>
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
