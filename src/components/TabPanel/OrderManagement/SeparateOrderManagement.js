import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import { ListItemIcon, NativeSelect, Tooltip } from '@material-ui/core';
 import 'react-date-range/dist/styles.css'; // main css file
 import 'react-date-range/dist/theme/default.css'; // theme css file
 import moment from 'moment';
 import { Typography } from 'antd';

 import axios from 'axios';
 import { reactLocalStorage } from 'reactjs-localstorage';

//cLENDERS 3 APPROACH BY RICHPOST
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';

// DatePicker
import {DatePicker } from 'antd';
import "antd/dist/antd.css";
import HeaderClass from '../../../components/HomePage.js/HomePage.module.css';
import Spinner from '../../Spinner/Spinner';
import Footer from '../../Footer/Footer';
import Auxiliary from '../../../hoc/Auxiliary';
import CollapsibleOrderTable from './CollapsibleOrderTable';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import ExcelImage from '../../../assets/images/excel.png';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';




const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #DAF7A6',
    fontSize: 16,
    width:200,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 110,
    maxWidth: 300,
    
  },
  sortClass: {
    margin: theme.spacing(1),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(2),
  },

 
}));

const MENU_ITEM_HEIGHT = 48;
const MENU_ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: MENU_ITEM_HEIGHT * 4.5 + MENU_ITEM_PADDING_TOP,
      width: 240,
      marginTop:60,
    },
  },
};



function getStyles(name, selected, theme) {
  return {
    fontWeight:
    selected.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}



const filters = [
  'CREATED',
  'PROCESSING',
  'DISPATCHED',
  'COMPLETED',
  'PENDING',
  'CANCELLED',
  'CONFIRMED',
  'PAY_FAILED',
 
];


const SeparateOrderManagement =()=> {

 
  //handle logout
const   history = useHistory();

if(reactLocalStorage.get('id_token') == null || reactLocalStorage.get('id_token') === ''){
  history.push('/admin_dashboard_new');
    }


    const logout=()=>{
      reactLocalStorage.remove('id_token');
      history.push('/admin_dashboard_new');
  
  }
  const classes = useStyles();

  const theme = useTheme();

  //filter
  
  const [selected, setSelected] =  useState([
                                                  'CREATED',
                                                  'PROCESSING',
                                                  'DISPATCHED',
                                                  'COMPLETED',
                                                  'PENDING',
                                                  'CANCELLED',
                                                  'CONFIRMED',
                                                  'PAY_FAILED',                                              
                                                ]);

  const isAllSelected =
  filters.length > 0 && selected.length === filters.length;

  console.log(selected);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === filters.length ? [] : filters);
      return;
    }
    setSelected(value);
  };

  
  let selectCounter = '';

  if(selected.length < filters.length){
    selectCounter = selected.length+' selected';
  }else{
    selectCounter = 'All ('+filters.length+')';
  }
  //end of filter


 //daterangepicker start
 const { RangePicker } = DatePicker;

 const [dateRange, setDateRange] = useState( [ moment().clone().startOf('month'), moment() ] );

 let firstDay=[];
 let currentDate = [];

 if(dateRange != null){
  firstDay= dateRange[0];
  currentDate=dateRange[1];
    
 }else{
  firstDay = moment().clone().startOf('month');
  currentDate = moment().format('YYYY-MM-DD')+'T23:59:59.000Z';
 }

 let startDate = moment(firstDay).clone().startOf('month').format('YYYY-MM-DD')+"T00:00:00.000Z";
 let endDate = moment(currentDate).format('YYYY-MM-DD')+'T23:59:59.000Z';

 console.log("start date: ", startDate+", end date: "+currentDate);
 

 ////////////////////////////////// get the order lists START ////////////////////////

  //sorting data selected
  const [sortBy, setSortBy] = useState('deliveryInfo.slotStart');





  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };


  const [isLoading, setisLoading] = useState(true);

  const [orders, setOrders] = useState([]);

     
  const api = "/orders/details/?page=0&placedDate.specified=true&placedDate.greaterThanOrEqual="+startDate+"&placedDate.lessThanOrEqual="+endDate+"&size=1000&sort="+sortBy+",desc&status.in="+selected.join(',')+"";
  const token = reactLocalStorage.get('id_token');
  const jwtToken ='Bearer '+token;

  //get the orders based on order date
    useEffect( () =>{


      data_api1();

    
    },[api, jwtToken]);


    const data_api1 = () =>
    {

      axios.get(api, {
        headers: {
        'Authorization': jwtToken,
        'Accept' : '*/*',
        'Content-Type': 'application/json',
        'App-Token' : 'A14BC'
          }
        })
        .then(order =>{
          setOrders(order.data);
            console.log("ORDERS based on order date: ",order.data);
            setisLoading(false);
          return order;
        })

    }



  //get the orders based on delivery date

   //get the delivery date from the DatePicker for Delivery date sorting
   const [deliveryDate, setDeliveryDate] = useState( moment() );
  
   const chosenDeliveryStartDate = moment(deliveryDate).format('YYYY-MM-DD')+"T00:00:00.000Z";
   const endDeliveryDate = moment(deliveryDate).format('YYYY-MM-DD');

   //get the axios orders
  const api2="orders/details/?page=0&placedDate.specified=true&placedDate.greaterThanOrEqual="+startDate+"&placedDate.lessThanOrEqual="+endDate+"&size=1000&sort="+sortBy+",desc&status.in="+selected.join(',')+"";
  
  const [placedDateOrders, setPlacedDateOrders] = useState([]); 
  const [placedDateOrders1, setPlacedDateOrders1] = useState([]); 


  let conctas = new Array();

  useEffect( () =>{


    data_api();
    setisLoading(true);

    
    },[deliveryDate]);

    const data_api = () =>{
      axios.get(api2, {
        headers: {
        'Authorization': jwtToken,
        'Accept' : '*/*',
        'Content-Type': 'application/json',
        'App-Token' : 'A14BC'
          }
        })
        .then(order =>{
          for(var i=0; i<order.data.length; i++)
          {

            if(endDeliveryDate == order.data[i].deliveryInfo["slotStart"].slice(0, 10))
            {

              conctas.push(order.data[i]);


             }


          }  
          setPlacedDateOrders(conctas)
          setisLoading(false);



   
        })
    }


    //use this dataHolder in the table to display data
    let dataHolder = orders;
    let dataHolder1 = placedDateOrders1;

  //use the above products response based on sort data selected
  if(sortBy === 'deliveryInfo.slotStart'){
    dataHolder = placedDateOrders;

  }else{
    dataHolder = orders

  }




  //order excel export handler
  const handleExcelExport = () =>{

    var workBook = XLSX.utils.book_new();
            
            workBook.SheetNames.push("Order ExcelSheet");

           const flattenData =  dataHolder.map(res=>{
              
               return     {
                      'Order ID': res.id,
                      'Placed Date': res.placedDate,
                      'Status': res.status,
                      'Customer Name': res.customer.firstName,
                      'Email': res.customer.email,
                      'Phone': res.customer.phone,
                      'Delivery Slot': res.deliveryInfo.slotStart+" - "+res.deliveryInfo.slotEnd
                    }
              
            });
 
            
            var workSheet = XLSX.utils.json_to_sheet(flattenData);

            workBook.Sheets["Order ExcelSheet"] = workSheet;
            var parsedExcelSheetData = XLSX.write(workBook, {bookType:'xlsx',  type: 'binary'});
            
            function sheetToArrayBuffer(s) {
      
                    var buffer = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buffer);
                    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                    return buffer;
                    
            }

            //to let the user save the file with saveAS()
            saveAs(new Blob([sheetToArrayBuffer(parsedExcelSheetData)],{type:"application/octet-stream"}), 'orders.xlsx');
  }



  return (
    <Auxiliary>
      
    <div>

      {/* header start */}
  
          <div style={{position:'relative'}}>
              <div className={HeaderClass.Header}>
                        <Button style={{float:'left', margin:'15px', opacity: '0.7', fontWeight:'1000', fontSize: '16px'}}><strong>URBAN TILLER</strong></Button>
                        <Button onClick={logout} variant="outlined" style={{float:'right', color: 'white', margin:'18px', borderColor: 'white'}}><strong>Logout</strong></Button>          
                </div>
          </div>
      {/* header end */}

       
          <div style={{marginTop:'90px', marginLeft:'15px'}}>         
              <Typography gutterBottom variant="h5" component="h5">
                  <NavLink to="/homepage" style={{textDecoration:'none'}}>Home</NavLink> / <span style={{color:'grey'}}>Orders</span>
              </Typography>                           
          </div>

    <div style={{display:'flex', position:'fixed',marginLeft:'12px', marginTop:'30px'}}>

        <div>
          <h5>All Orders </h5>
        </div>

        <div style={{marginLeft:'70px', marginTop:'-16px'}}>

            <div style={{display:'inline-block', marginTop:'20px', float:'left'}}>
              <h6>Sort by:</h6>
            </div>
            
            <div style={{display:'inline-block', float:'right'}}>
               <FormControl className={classes.sortClass}>
                  <NativeSelect
                    id="demo-customized-select-native"
                    value={sortBy}
                    onChange={handleSortBy}
                    input={<BootstrapInput />}
                  >
                    <option value='placedDate' selected>Order Date</option>
                    <option value='deliveryInfo.slotStart' >Delivery Date</option>
                  </NativeSelect>
                </FormControl>
            </div>
        </div>


        <div style={{marginLeft:'50px', marginTop:'-16px'}}>

            <div style={{display:'inline-block', marginTop:'20px', float:'left'}}>
              <h6>Filter by:</h6>
            </div>

            <div style={{display:'inline-block',  float:'left'}}>
                <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  displayEmpty
                  value={selected}
                  onChange={handleChange}
                  input={<BootstrapInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>--None Selected--</em>;
                    }

                    return selectCounter;
                  }}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="all">
                    <ListItemIcon>
                      <Checkbox
                        checked={isAllSelected}
                        indeterminate={selected.length > 0 && selected.length < filters.length}
                      />
                    </ListItemIcon>
                    <ListItemText primary={<strong>Select All</strong>} />
                  </MenuItem>

                  {filters.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, selected, theme)}>
                      <Checkbox checked={selected.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </div>
    </div>

    <Tooltip 
      title="export"
      placement="top"
      arrow
      PopperProps={{
          popperOptions: {
              modifiers: {
              offset: {
                  enabled: true,
                  offset: '1px, 0px',
                  },
              },
              },
          }}
        >
        <Button onClick={handleExcelExport} style={{marginLeft:'80px', marginTop:'-15px'}}>
                <img src={ExcelImage} style={{height:'35px',width:'35px'}} alt="excel_import_image"/>
        </Button>
    </Tooltip>

    <div  style={{marginLeft:'80px', display:'flex'}}>

        <div style={{display:'inline-block', marginTop:'4px',marginRight:'8px', float:'left'}}>
          <h6>Date range: </h6>
        </div>

        <div style={{display:'inline-block', float:'right'}}>

            {sortBy === 'placedDate' ? <RangePicker
                                          style={{marginTop:'-10px',height: '43px', borderRadius:'4px', border:'2px solid #DAF7A6'}}
                                          value={dateRange}
                                          onChange={(newValue) => {
                                            setDateRange(newValue);
                                          }}                                     
                                        />
              
                                      : <DatePicker 
                                          style={{marginTop:'-10px',width:'309px',height: '43px', borderRadius:'4px', border:'2px solid #DAF7A6'}}
                                          value={deliveryDate}
                                          onChange={(newValue) => {
                                            setDeliveryDate(newValue);
                                            data_api();
                                            }}
                                        />
                            }
          </div>
    </div>
          
    </div>

    {/*///////////////// table content ////////////////*/}
    { !isLoading ?   <div style={{marginTop:'120px', width:'100%'}}>
                      <div style={{overflow:'auto',overflowX:'hidden', height:'480px', width:'100%'}}>
                        <div>
                            <CollapsibleOrderTable  tableData = {dataHolder}/>
                        </div>
                      </div>
                    </div>
                : <Spinner />

    }
        {/* <div style={{backgroundColor: 'grey', color:'white', position:'fixed', width:'97%',bottom:0, height:'130px'}}>
              <Footer />
        </div> */}

</div>

            
    </Auxiliary>
  );
}


export default SeparateOrderManagement;
