import React from 'react';
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
                      
                              <CardContent>
                                <Typography gutterBottom variant="h6" component="h2">
                                  <NavLink to="/homepage" style={{textDecoration:'none'}}>Category</NavLink> / <span style={{color:'grey'}}>add-category</span>
                              </Typography>

                              <div>
                                  <TextField
                                    id="Category Name"
                                    label="Category Name"
                                    style={{ marginLeft: 2,marginTop: 35 }}
                                    placeholder="category name...."
                                    helperText=""
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    variant="outlined"
                                  />

                                  <TextField
                                    id="Category Description"
                                    label="Category Description"
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
                                  />

                                  <TextField
                                    id="Category Image URl"
                                    label="Category Image URl"
                                    style={{ marginLeft: 2,marginTop:12}}
                                    placeholder="category iage url...."
                                    helperText=""
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    variant="outlined"
                                  />     
                                </div>
                              </CardContent>

                            <div style={{marginLeft:'25px', marginBottom:'30px', marginTop:'10px'}}>
                            <Button style={{width:'47%'}} variant="outlined" color="primary">
                              Save
                            </Button>
                            <NavLink to="/homepage">
                                <Button style={{width:'47%', float:'right', marginRight:'22px'}} variant="outlined" color="secondary">
                                  Cancel
                                </Button>
                            </NavLink>
                          </div>
                  
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