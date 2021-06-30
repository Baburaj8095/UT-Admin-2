import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

import vegImage1 from '../../assets/images/vegImage1.png';

import side_img from '../../assets/images/side_img.png';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { IconButton, InputAdornment } from '@material-ui/core';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';




const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url('+ side_img +')',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Login=()=> {

    let history = useHistory();


    const [data, setData] = useState({
                                      email:'',
                                      password:'',
                                      showPassword: false,
                                    });

    const [market,setMarket] = useState(''); 

    const [marketValue,setmarketValue] = useState(''); 


    const handleClickShowPassword = ()=>{
      setData({...data, showPassword: !data.showPassword});
      }

    const handleLoginData=(event) =>{
        const newData = {...data};
        newData[event.target.id] = event.target.value;
        setData(newData);
        console.log(newData);
    }

    const handleLoginData1=(event) =>{
      setmarketValue(event.target.value);
      console.log(event.target.value);
  }


    
  useEffect(() => {

    
      fetchData()
    

 

  }, []);

   const fetchData = () => {
      axios.get('/tenants' )
      .then(res=>{
        setMarket({ data : res.data})
              
      })
    }

                                    


    const handleLogin=(event) =>{
      event.preventDefault();
        
      let authApi ='/';

      authApi = "/"+marketValue+"/authenticate";

                                        
      const body = {username:data.email, password:data.password};
          


          axios.post(authApi, body)
              .then(response =>{

                reactLocalStorage.set('id_token',response.data.id_token);
                stores(response.data.id_token)

                  //window.location='/homepage';
                //return history.push("/homepage");

              }).catch(error=>{
                console.log("Error: ", error);
              })

        
    }

    const stores = (token_id) => {


      axios.get('/store', {
      headers: {
        'Authorization': 'Bearer '+ token_id,
        'Accept' : '*/*',
        'Content-Type': 'application/json',
        'App-Token' : 'A14BC'
      }
          })
              .then(response1 =>{

                console.log(response1.data)
                reactLocalStorage.set('country',response1.data.country);
                validation()


              }).catch(error=>{
                console.log("Error: ", error);
              })
    }
    

    const validation = () =>{

      return history.push("/homepage");

    }


  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={(event) =>handleLogin(event)} method="get" className={classes.form} noValidate>
            <TextField
            InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                  <EmailOutlinedIcon />
              </InputAdornment>
                ),
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={data.email}
              onChange={(event) =>handleLoginData(event)}
            />

            <TextField
              type={data.showPassword ? 'text' : 'password'}
              
              InputProps={{       
                startAdornment: (
                <InputAdornment position="start">
                    <LockOutlinedIcon />
                </InputAdornment>
                ),
                endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {data.showPassword ? <VisibilityOutlinedIcon style={{height:'17px', width:'17px'}}/> : <VisibilityOffOutlinedIcon style={{height:'17px', width:'17px'}}/>}
                      </IconButton>
                    </InputAdornment>
                    )
                  
                }}
  
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={(event) =>handleLoginData(event)}
            />
               
              <FormControl variant="outlined" style={{marginLeft:'0px'}} fullWidth className={classes.formControl}>
                <InputLabel id="market">Market</InputLabel>
                <Select
                
                  labelId="market"
                  id="market"
                  value={data.market}
                  onChange={(event) =>handleLoginData1(event)}
                  label="Market"
                >

{

  market.data
   && market.data.map( category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem> )     
               

} 
                </Select>
              </FormControl>
      




            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            
            
            <Box mt={5}>
              <Grid container>
                <Grid item xs>
                  <p variant="body2">
                   &copy; Urban Tiller
                  </p>
                </Grid>
                <Grid item>
                  <p variant="body2">
                      Powered by Xircular Pte Ltd
                  </p>
                </Grid>
              </Grid>
            </Box>
            
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}


export default Login;