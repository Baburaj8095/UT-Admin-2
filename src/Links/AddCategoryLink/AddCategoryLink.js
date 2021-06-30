import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { NavLink, withRouter } from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary';
import HeaderClass from '../../components/HomePage.js/HomePage.module.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Footer from '../../components/Footer/Footer';
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';
import { Box, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({

  root: {
    width: 1438,
     justifyContent:'center',
     
  },
  
  diagonal:{
      backgroundImage: 'linear-gradient(to bottom right, #e9ffdb 55%, #e9ffdb 40%)',
      height: '100vh',
      width:'100%',
      position: 'relative',
  
      
  },
  buttons:{
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}));

const AddCategoryLink=()=> {
  
  const   history = useHistory();

  if(reactLocalStorage.get('id_token') == null || reactLocalStorage.get('id_token') === ''){
    history.push('/');
      }


   
    const logout=()=>{

        reactLocalStorage.remove('id_token');
        history.push('/');

    }

//axios code to create a new category

  //body
//   {
//     "name": "Drinks",
//     "description":"fresh drinks",
//     "categoryImage" : "",
//     "rank":3,
//     "archieved":false
// }
  const [body, setbody] = useState({ 
                                      name: '',
                                      description: '',
                                      categoryImage : '',
                                      rank:1,
                                      archieved:false,
                                      
                                      });

                                      
//handle user form input data
  const handleInputData=(event) =>{ //the above property names must match the id of the input fields
    const newData= {...body};
    newData[event.target.id] = event.target.value;
    setbody(newData);
    console.log(newData);
  }

 
  //api
  const api = "/product-categories";

  //id_token in the localStorage
  const id_token= reactLocalStorage.get('id_token');

 //jwt token
 const jwtToken ='Bearer '+id_token;

const headerObject = {
                        'Authorization': jwtToken,
                        'Accept' : '*/*',
                        'Content-Type': 'application/json',
                        'App-Token' : 'A14BC'
                      }


const submitData =(event)=>{
  event.preventDefault();
 // console.log("id_token from localstorage: ",reactLocalStorage.get('id_token'));

 // product-category input data
  //body
  const product = {
                      name: body.name,
                      description: body.description,
                      categoryImage : body.categoryImage,
                      rank:parseInt(body.rank),
                      archieved:body.archieved,
                    }
 
  axios.post(api,
           product,
           {headers: headerObject} 
           )
          .then(response=>{
              console.log("submited product-category data: "+response.data);
              return history.push("/homepage");
                }
            ).catch((error)=>{
              console.log("error while posting data: ",error);
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
                        <Card className={classes.root}>
                        
                          <form onSubmit={(event) =>submitData(event)} method="get" className={classes.form} noValidate>
                              <CardContent>
                                <Typography gutterBottom variant="h6" component="h2">
                                  <NavLink to="/homepage" style={{textDecoration:'none'}}>Category</NavLink> / <span style={{color:'grey'}}>add-category</span>
                              </Typography>
                              
                            
                              <div>
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Category Name"
                               
                                    autoComplete="name"
                                    autoFocus
                                    value={body.name}
                                    onChange={(event) =>handleInputData(event)}                                  
                                    style={{ marginLeft: 2,marginTop: 35 }}
                                    placeholder="category name...."
                                    InputLabelProps={{
                                      shrink: true,
                                    }}                                  
                                    
                                     size="small"
                                  />

                                  <TextField

                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="description"
                                  label="Category Description"
                             
                                  autoComplete="description"
                                  autoFocus
                                  value={body.description}
                                  onChange={(event) =>handleInputData(event)}                                  
                                  style={{ marginLeft: 2,marginTop: 12 }}
                                  placeholder="category name...."
                                  InputLabelProps={{
                                    shrink: true,
                                  }}                                          
                                  multiline
                                    
                                  size="small"
                                  rows={3}
                                  />

                                  <TextField
                                  type="number"
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="rank"
                                  label="Category Rank"
                                  
                                  autoComplete="CategoryRank"
                                  autoFocus
                                  value={body.rank}
                                  onChange={(event) =>handleInputData(event)}                                  
                                  style={{ marginLeft: 2,marginTop: 12 }}
                                  placeholder="category rank between( 1 - 100 )"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}                                                                        
                                  size="small"
                                      
                                  />

                                  <TextField

                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="categoryImage"
                                  label="Category Image URl"
                                 
                                  autoComplete="CategoryImageURl"
                                  autoFocus
                                  value={body.categoryImage}
                                  onChange={(event) =>handleInputData(event)}                                  
                                  style={{ marginLeft: 2,marginTop: 12 }}
                                  placeholder="category iage url...."
                                  helperText=""
                                  InputLabelProps={{
                                    shrink: true,
                                  }}              
                                  size="small"
                                    
                                  />
                                  
                                </div>
                              </CardContent>

                            <div style={{marginLeft:'25px', marginBottom:'30px', marginTop:'10px'}}>
                              <Button type="submit" style={{width:'47%'}} variant="outlined" color="primary">
                                Save
                              </Button>
                              <NavLink to="/homepage">
                                  <Button style={{width:'47%', float:'right', marginRight:'22px'}} variant="outlined" color="secondary">
                                    Cancel
                                  </Button>
                              </NavLink>
                            </div>                            
                       </form>
                    </Card>

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


export default AddCategoryLink;