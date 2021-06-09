import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import axios from 'axios';


import classes2 from './ProductTabContent.module.css';
import PaginatedData from '../../containers/Pagination/PaginatedData';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 523,
  },

  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },

}));

//

export default function ProductTabContent() {

  const classes = useStyles();
  

  //jwt token
  const [token, setToken] = useState(null);

  //categories
  const [category, setCategory] = useState([]);


  //get the product-category list
  const api = "/product-categories";
  const jwtToken ='Bearer '+token;


//const bar = React.useCallback(() => {{username: 'guest', password: 'user'}, [])
  //axios request body
  
  const authApi = "/2/authenticate";

//post request to get the jwt
  useEffect( () =>{
    const body = {username: 'guest', password: 'user'};
          axios.post(authApi, body)
              .then(response =>{
                setToken(response.data.id_token);
                return response;
              })
              .then(()=> axios.get(api, {
                headers: {
                'Authorization': jwtToken,
                'Accept' : '*/*',
                'Content-Type': 'application/json',
                'App-Token' : 'A14BC'
                  }
                }))
                .then(productCategory =>{
                  setCategory(productCategory.data);
                  return productCategory;
                })
              },[authApi,jwtToken, api]);
  


  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [CategoryId, setCategoryId] = useState(null);
  console.log(CategoryId);

  const sendCategoryId =(id) =>{
    setCategoryId(id);
  }

  return (
    <div className={classes.root}>
    
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Categories"
        className={classes.tabs}
      >

      {category.map((cat =>{
        //onClick={function (){sendCategoryId(cat.id)}} 
          return(
            <Tab key={cat.id} onClick={function (){sendCategoryId(cat.id)}} className={classes2.tab} label={cat.name} {...anyProps(0)} style={{marginRight:'10px',fontSize: '12px', fontWeight: '600'}}/>
          )
        }))
        }


        {/* <Tab className={classes2.tab} label="Salad Essentials" {...anyProps(1)} style={{marginRight:'10px',fontSize: '12px', fontWeight: '600'}}/>
        <Tab className={classes2.tab} label="Flavour Bombs" {...anyProps(2)}  style={{marginLeft:'-10px', fontSize: '12px', fontWeight: '600'}}/>
       */}
      </Tabs>
      <div className={classes2.divScroller}>
        <TabPanel value={value} index={0}>
          <PaginatedData />
        </TabPanel>
      </div>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}





//tab side content
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
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
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }