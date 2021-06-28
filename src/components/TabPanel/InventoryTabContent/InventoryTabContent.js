import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Card, Grid, IconButton, Toolbar, Tooltip } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Paginator from 'react-paginate';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';

import InventoryTabContentCss from './InventoryTabContent.module.css';
import Spinner from '../../Spinner/Spinner';
import Footer from '../../Footer/Footer';
import AddInventoryModal from './AddInventoryModal';


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


const InventoryTabContent=()=> {
  const classes = useStyles();

const [isLoading, setisLoading] = useState(true);

  const [InventoryData, setInventoryProducts] = useState([]);

  const token = reactLocalStorage.get('id_token');
  //api for product inventories
  const api = "/product-inventories";
  //const jwt = reactLocalStorage.get('id_token');
  const jwtToken ='Bearer '+token;
  
  //to get the product based on the product_id in the inventory
  const [Product, setProduct] = useState([]);
  const [ProductId, setProductId] = useState(null);
  
  

  



//const [resp, setGitData] = useState({ data: null, repos: null });

  useEffect(() => {

    let api2 = '';
    const getProductId = ()=>{
        if(ProductId != null){
            api2 = "/products/"+ProductId;
        }
    } 
   
      setisLoading(false);

      axios.get(
                api, {
                        headers: {
                        'Authorization': jwtToken,
                        'Accept' : '*/*',
                        'Content-Type': 'application/json',
                        'App-Token' : 'A14BC'
                        }
                        }
                    ).then(resp=>{
                                setInventoryProducts(resp.data);

                    });

    //   const productsResponse = axios.get(
//                                         api2, {
//                                             headers: {
//                                             'Authorization': jwtToken,
//                                             'Accept' : '*/*',
//                                             'Content-Type': 'application/json',
//                                             'App-Token' : 'A14BC'
//                                                 }
//                                             }
    //                                         );

    // axios.all([inventoResponse]).then(axios.spread((...responses) => {
    //     setInventoryProducts(responses);
    //     //setProduct(responses[1]);
    //     getProductId();
    //     //setInventoryProducts({ inventory: responses[0].data, product: responses[1].data });
    //     console.log("inventory data: "+responses);
       
    //     })).catch(errors => {
    //             console.log("error from InventoryTabContent.js: ", errors);
    //     })

      //setInventoryProducts({ inventory: inventoResponse.data, product: productsResponse.data });



      axios.get(api2, {
                        headers: {
                        'Authorization': jwtToken,
                        'Accept' : '*/*',
                        'Content-Type': 'application/json',
                        'App-Token' : 'A14BC'
                            }
                      }
                ).then(res=>{
                    setProduct(res.data);
                    console.log("producrs from single axios get products: ",res.data)
                });



  }, [jwtToken, api, ProductId]);




//pagination setup starts
const [pageNumber, setPageNumber] = useState(0);

//method to change the paginator number
const changePage = ({selected}) =>{
    setPageNumber(selected);
}

let itemsPerPage = 3;

// if(products.length <=5){
//     itemsPerPage = 11;
// }else{
//     itemsPerPage = 14;
// }


const pagesVisited = pageNumber * itemsPerPage;

const pageCount = Math.ceil(InventoryData.length / itemsPerPage);

//pagination setup ends



//////////////////////////////////////////      modal setUp starts     ///////////////////////////////////////////////////

const [openModal, setOpenModal] = useState(false);


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
                                //setProductId(res.product.id);
                                //Product.map(products=>{
                                    
                                    if(res){

                                      return(                           
                                            <Grid item sm={6} xs={12} lg={4} key={res.id}> 
                                                <TableContainer component={Card} className={classes.theCard}>

                                                        <Table className={classes.table} >
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell colSpan={4}>

                                                                            <Box className={classes.toolbar}>
                                                                                <Grid container>

                                                                                    <Grid item xs style={{width:'80px'}}>

                                                                                        <Typography variant="h6" className={classes.title}>
                                                                                            {res.product.id}
                                                                                        </Typography>
                                                                                        
                                                                                    </Grid>

                                                                                    <Grid item >
                                                                                        <Tooltip title="Add" placement="top">
                                                                                                <IconButton style={{color:'green'}}>
                                                                                                    <AddCircleOutlineIcon onClick={ () =>setOpenModal(true) }/>
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
                                                                        <TableCell colspan={2} >Stock</TableCell>
                                                                        
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    
                                                                        <TableRow>
                                                                            <TableCell style={ {border:'0px solid grey'}}>{res.unitName}</TableCell>
                                                                            <TableCell style={{border:'0px solid grey'}}>{res.price}</TableCell>
                                                                            <TableCell style={res.stock === 0 ? {border:'0px solid grey', color:'red'} : {border:'0px solid grey', color:'green'} }>{res.stock}</TableCell>
                                                                            <TableCell style={{border:'0px solid grey'}}>
                                                                                <Tooltip  title={res.stock === 0 ? "not allowed" : "Remove"}  placement="top">
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
                                                    </TableContainer>
                                             </Grid>
                        

                                            )
                                
                                

                         }else{ return null}                            
                            //}) //end of inner map return
                                    
                 return null;
                            })//end of outer map


}//end of else




  return (
      <div style={{flexGrow: 1, marginTop:'35px'}}>

          <h4 style={{marginBottom:'20px'}}>All Inventory</h4>

            <Grid container spacing={5}>
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
                
            <div style={{backgroundColor: 'grey', color:'white', position:'fixed', width:'97%', marginTop:'45px', bottom:0, height:'140px'}}>
                    <Footer />
            </div>

    </div>
  );






}


export default InventoryTabContent;