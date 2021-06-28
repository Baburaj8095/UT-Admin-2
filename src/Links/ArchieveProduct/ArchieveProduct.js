import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { NavLink, withRouter } from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary';
import HeaderClass from '../../components/HomePage.js/HomePage.module.css';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';



const useStyles = makeStyles((theme) => ({
  
  diagonal:{
      // backgroundImage: 'linear-gradient(to bottom right, #e9ffdb 55%, #e9ffdb 40%)',
      height: '100vh',
      width:'100%',
      position: 'relative',
  
      
  },
  buttons:{
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  
}));

const ArchieveProduct=(props)=> {

    


//handle logout
const   history = useHistory();

const logout=()=>{
    reactLocalStorage.remove('id_token');
    history.push('/');

}


//retrieve data from localstorage
const prod_data = reactLocalStorage.getObject('productData');

  //body
  const [body, setbody] = useState({
                                      id: prod_data.Pid,
                                      name: prod_data.Pname,
                                      description: prod_data.Pdesc,
                                      productImage : prod_data.Pimage,
                                      archieved: true,
                                      rank: prod_data.Prank,
                                      dateInventory:true,
                                      productCategory:{
                                          id:prod_data.PCatID, // or reactLocalStorage.get('cat_id')
                                      }
                                      });





//handle user input data
  const handleInput = (e) =>{
    const newData= {...body};
    newData[e.target.id] = e.target.value;
    setbody(newData);
    console.log(newData);
  }

 
  //api
  const api = "/products";

  //id_token in the localStorage
  const id_token= reactLocalStorage.get('id_token');

 //jwt token
 const jwtToken ='Bearer '+id_token;


  // //body
  const product = {
                      id: body.id,
                      name: body.name,
                      description: body.description,
                      productImage : body.productImage,
                      archieved: body.archieved,
                      rank:parseInt(body.rank),
                      dateInventory:body.dateInventory,
                      productCategory:{
                                          id:body.productCategory.id, 
                                      }
                      
                      }

const headerObject = {
                        'Authorization': jwtToken,
                        'Accept' : '*/*',
                        'Content-Type': 'application/json',
                        'App-Token' : 'A14BC'
                      }

const submitData =()=>{
 
 // console.log("id_token from localstorage: ",reactLocalStorage.get('id_token'));

 
  axios.put(api,
           product,
           {headers: headerObject} 
           )
          .then(response=>{
              console.log("updated product details: "+response.data);
              return history.push("/homepage");
                }
            ).catch((error)=>{
                const errorAlert = window.confirm("something went wrong, please try again");
                if(errorAlert){
                  history.push('/edit-product');
                }
              console.log("error while updating data: ",error);
            })
                
  }


  


  const classes = useStyles();

  return (
    <Auxiliary>
      
            <div className={classes.diagonal}>

                  {/* header start */}
  
                    <div style={{position:'relative'}}>
                        <div className={HeaderClass.Header}>
                                  <Button style={{float:'left', margin:'15px', opacity: '0.7', fontWeight:'1000', fontSize: '16px'}}><strong>URBAN TILLER</strong></Button>
                                  <Button onClick={logout} variant="outlined" style={{float:'right', color: 'white', margin:'18px', borderColor: 'white'}}><strong>Logout</strong></Button>          
                          </div>
                    </div>
                  {/* header end */}

                      <div style={{margin:0, position: 'absolute', top: '12%', marginLeft: '50px'}}>
                        <div>
                        <Typography gutterBottom variant="h6" component="h2">
                                  <NavLink to="/homepage" style={{textDecoration:'none'}}>Category</NavLink> / <span style={{color:'grey'}}>Archieve Product</span>
                              </Typography>

                              <div>
                              
                                  <TextField
                                    id="name"
                                    label="Product Name"
                                    onChange={(e) => handleInput(e)}
                                    defaultValue={body.name}
                                    style={{ marginLeft: 2,marginTop: 35 }}
                                    placeholder="product name...."
                                    helperText=""
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    variant="outlined"
                                    required
                                  />

                                  

                                  <TextField
                                    id="description"
                                    label="Product Description"
                                    onChange={(e) => handleInput(e)}
                                    defaultValue={body.description}
                                    multiline
                                    fullWidth
                                    size="small"
                                    style={{ marginLeft: 2,marginTop:12 }}
                                    margin="normal"
                                    rows={3}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    placeholder="description...."
                                    variant="outlined"
                                    required
                                  />

                                  <TextField
                                    id="productImage"
                                    label="Product Image URL"
                                    onChange={(e) => handleInput(e)}
                                    defaultValue={body.productImage}
                                    style={{ marginLeft: 2, marginTop:12}}
                                    placeholder="product image url...."
                                    helperText=""
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    variant="outlined"
                                    required
                                  />
                                       
                                </div>
                              

                            <div style={{marginLeft:'5px', marginBottom:'30px', marginTop:'30px'}}>
                                <Button onClick={submitData} style={{width:'48%'}} variant="outlined" color="primary">
                                Archieve
                                </Button>
                                
                                <NavLink to="/homepage">
                                  <Button style={{width:'48%', float:'right'}} variant="outlined" color="secondary">
                                    Cancel
                                  </Button>
                                </NavLink>
                            </div>

                           
                  
                    </div>

                    {/* <div style={{backgroundColor: 'grey', color:'white', marginTop:'65px', width:'100%', height:'135px'}}>
                      <Footer />
                    </div> */}
                </div>


                <div style={{backgroundColor: 'grey', color:'white', position:'absolute', bottom:'0', width:'100%', height:'149px'}}>
                      <Footer />
                    </div>  



          </div>
            {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
              
    </Auxiliary>
  );
}


export default ArchieveProduct;