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
import AddProductsLink from '../../../Links/AddProductsLink/AddProductsLink.js';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 523,
     marginTop:'80px'
    //position:'fixed',//this positions the categories and theproduct list and the pagination fixed
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


  const [CategoryId, setCategoryId] = useState();
  const [localStorage, setlocalStorage] = useState(null);


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
                  setCategoryId(productCategory.data[0].id)
                  return productCategory;
                })


                reactLocalStorage.set('category_id', localStorage);
                reactLocalStorage.set('cat_name', catName);
                reactLocalStorage.set('rank', Rank);
                reactLocalStorage.set('clicked_count', i++);
                console.log("the counter value: ",localStorage);    

      },[jwtToken, api, token,localStorage]);
  


  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const defaultList = '';
                      

  const listOfProducts = '' ;
                          

  const [productList, setproductList] = useState(defaultList);

  //storing the category id in the useState hook
  

  //storing the category name
  const [catName, setCatName] = useState(null);

  //storing the rank in the localStorage to be used while creating a product(AddProductsLink.js)
  const [Rank, setRank] = useState(1);

  const [counterr, setcount] = useState(0); //to test if counter is incrementing or not

  const sendCategoryId =(id,counter, name, rank) =>{
    
    setCategoryId(id);
    setproductList(listOfProducts);
    setlocalStorage(id);
    setCatName(name);
    setRank(rank);

    setcount(counter); 

    setLocal();
   
    
  }

  //storing the category data in the LocalStorage
  let i=0;
  const setLocal=()=>{
    reactLocalStorage.set('category_id', localStorage);
    reactLocalStorage.set('cat_name', catName);
    reactLocalStorage.set('rank', Rank);
    // i++;
    reactLocalStorage.set('clicked_count', i++);
    console.log("the counter value: ",localStorage);    
  }


let indexNum = [];
let count = 0;

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

          indexNum.push(count++);
          
          //onClick={function (){sendCategoryId(cat.id)}} 
            return(
                <Tab key={index} onClick={function (){sendCategoryId(cat.id, count, cat.name, cat.rank)}} className={classes2.tab} label={cat.name} {...anyProps(0)} style={{minWidth:'60px',marginRight:'10px',fontSize: '12px', fontWeight: '600'}}/>
              )
          })
          }

      </Tabs>

        {
          
          CategoryId !=null ?   indexNum.map(val =>{
                                        return(
                                            <TabPanel value={value} index={val}>
                                                 {CategoryId && <LocalFavourites cId={CategoryId} /> }
                                                
                                              </TabPanel>
                                              
                                            )

                                      })

                          : <TabPanel>
                               {CategoryId && <LocalFavourites cId={CategoryId} />}
                             
                            </TabPanel>
        }                  

     
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