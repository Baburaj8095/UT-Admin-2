import React,{useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import { withRouter } from 'react-router-dom';


import ProductTabContent from './ProductTabContent/ProductTabContent';

import AddCategory from '../Buttons/AddCategory/AddCategory';
import AddProduct from '../Buttons/AddProduct/AddProduct';
import InventoryTabContent from './InventoryTabContent/InventoryTabContent';
import TimeAndSlot from './TimeAndSlot/TimeAndSlot';
import OrderManagement from './OrderManagement/OrderManagement';


//to enable scrollbar in all the main pages, remove the styling in the App.js

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    position:'fixed',
    width:'100%',
    
  },
  indicator: {
    backgroundColor: '#32CD32',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({ // main header tabs panel
  root: {
    textTransform: 'none',
    minWidth: 72,
    top:0,
    marginLeft: '15px',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
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
    '&:hover': {
      color: '#32CD32',
      opacity: 1,
    },
    '&$selected': {
      color: 'black',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'black',
    },
  },
  selected: {},
})) ((props) => <Tab disableRipple {...props} />);



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: { // main header tabs panel
    position:'fixed',
    top:'70px',
    width:'100%',
    backgroundColor: theme.palette.background.paper,
  },
  rowElementsDiv:{ // category, all products, add product, add category div
    position:'fixed',
    width:'100%',
    marginTop:'65px',
    textAlign: 'center',
  },
  // rowElements:{
  //   display: 'inline-block',
  // }
  
}));

const HeaderBelowMenu = ()=> {
  const classes = useStyles();
  //const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleChangeIndex = (index) => {
    setValue(index);
  };


 //link for the addCategory component
    let history = useHistory();


  return (
    <div className={classes.root}>

      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} >
          <AntTab label="Product" {...anyProps(0)}/>
          <AntTab label="Inventory" {...anyProps(1)}/>
          <AntTab label="Delivery Time slot" {...anyProps(2)}/>
          <AntTab label="Order Management" {...anyProps(3)}/>
        </AntTabs>
        <Typography className={classes.padding} />
      </div>


  {value === 0 ?  <div className={classes.rowElementsDiv}>
                      <div style={{display:'inline-block', float:'left', marginLeft:'60px'}}>
                        <h5 style={{opacity: '0.8'}}>Category</h5>
                      </div>

                      <div style={{display:'inline-block', marginRight:'445px'}}>
                        <span style={{fontSize:'18px'}}> All Products</span>
                      </div>
                      
                      <div style={{display:'inline-block', float:'right', marginRight:'115px'}}>
                        <NavLink to="/add-category" style={{textDecoration:'none'}}><AddCategory /></NavLink>
                      </div>
                  
                      <div style={{display:'inline-block', float:'right'}}>
                        <NavLink to="/add-product" style={{textDecoration:'none'}}><AddProduct /></NavLink>
                      </div>
                  </div>

             : null}

              <br/>

      <div
        index={value}
        onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}  style={{marginTop: '-42px'}}>
<br/>
            <ProductTabContent />

          </TabPanel>
          
          <TabPanel value={value} index={1} style={{marginTop: '10px'}}>
            <InventoryTabContent />
          </TabPanel>

          <TabPanel value={value} index={2} style={{marginTop: '10px'}}>
            <TimeAndSlot />
          </TabPanel>

          <TabPanel value={value} index={3} >
            <OrderManagement />
          </TabPanel>
      </div>


    </div>
  );
}

export default withRouter(HeaderBelowMenu);



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function anyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}