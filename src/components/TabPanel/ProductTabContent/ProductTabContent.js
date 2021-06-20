import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';


import classes2 from './ProductTabContent.module.css';
import LocalFavourites from '../../../containers/SideTabs/LocalFavourites';
import SaladEssentials from '../../../containers/SideTabs/SaladEssentials';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 523,
  },

  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  }



}));

//

export default function ProductTabContent() {

  const classes = useStyles();
  

  //categories
  const [category, setCategory] = useState([]);

  //jwt token from LocalStorage
  const token = reactLocalStorage.get('id_token');
  //get the product-category list
  const api = "/product-categories";
  //const jwt = reactLocalStorage.get('id_token');
  const jwtToken ='Bearer '+token;


  

//get the product category
  useEffect( () =>{

        axios.get(api, {
                headers: {
                'Authorization': jwtToken,
                'Accept' : '*/*',
                'Content-Type': 'application/json',
                'App-Token' : 'A14BC'
                  }
                })
                .then(productCategory =>{
                  setCategory(productCategory.data);
                  return productCategory;
                })
      },[jwtToken, api, token]);
  


  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [CategoryId, setCategoryId] = useState(null);

  const defaultList = <LocalFavourites cId={CategoryId} />;
                      

  const listOfProducts =  <SaladEssentials cId={CategoryId} />;
                          

  const [productList, setproductList] = useState(defaultList);

  //storing the category id in the useState hook
  const [localStorage, setlocalStorage] = useState(null);
  

  //storing the category name
  const [catName, setCatName] = useState(null);

  const sendCategoryId =(id, name) =>{
    
    setCategoryId(id);
    setproductList(listOfProducts);
    setlocalStorage(id);
    setCatName(name);
    setLocal();
   
    
  }

  //storing the category id in the LocalStorage
  let i=0;
  const setLocal=()=>{
    reactLocalStorage.set('category_id', localStorage);
    reactLocalStorage.set('cat_name', catName);
    // i++;
    reactLocalStorage.set('clicked_count', i++);
    
  }


let indexNum = [];
let count = 1;

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

        {category.map((cat, index) =>{

          indexNum.push(count);
          count++;
          //onClick={function (){sendCategoryId(cat.id)}} 
            return(
                <Tab key={index} onClick={function (){sendCategoryId(cat.id, cat.name)}} className={classes2.tab} label={cat.name} {...anyProps(0)} style={{minWidth:'60px',marginRight:'10px',fontSize: '12px', fontWeight: '600'}}/>
              )
          })
          }

      </Tabs>

        {
          
          CategoryId !=null ?   indexNum.map(val =>{
                                        return(
                                            <TabPanel value={value} index={val}>
                                                  {productList}
                                              </TabPanel>
                                              
                                            )

                                      })

                          : <TabPanel>
                                {defaultList}
                            </TabPanel>
        }
                  
        
        


      {/* <div className={classes2.divScroller}  >
        <TabPanel value={value} index={0}>
            <PaginatedData cId={CategoryId} />
        </TabPanel>
      </div>
      
      <div className={classes2.divScroller} >
          <TabPanel value={value} index={1}>
              <SaladEssentials cId={CategoryId} />
          </TabPanel>
      </div>

      <div className={classes2.divScroller} >
          <TabPanel value={value} index={2}>
              <FlavourBombs cId={CategoryId} />
          </TabPanel>
      </div> */}

     
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
        className={classes2.divScroller}
      >
      
        {value === index && (
          
          <Box p={3} >
              <Typography >{children}</Typography>  
          </Box>
        
          )
        }
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