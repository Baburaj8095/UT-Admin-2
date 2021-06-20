import React, { Component } from 'react';
import classes from './HomePage.module.css';
import Button from '@material-ui/core/Button';
import Auxiliary from '../../hoc/Auxiliary';
import FullWidthTabs from '../TabPanel/FullWidthTabs';
import { withRouter } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useHistory } from 'react-router';


 const HomePage =() =>{

    const   history = useHistory();

    if(reactLocalStorage.get('id_token') == null || reactLocalStorage.get('id_token') === ''){
        history.push('/');
    }
       
    const logout=()=>{

        reactLocalStorage.remove('id_token');
        history.push('/');

    }


        return(
            <Auxiliary>
                 {/* header start */}
                <div className={classes.Header}>
                
                    <Button style={{float:'left', margin:'15px', opacity: '0.7', fontWeight:'1000', fontSize: '16px'}}><strong>URBAN TILLER</strong></Button>
                    <Button onClick={logout} variant="outlined" style={{float:'right', color: 'white', margin:'18px', borderColor: 'white'}}><strong>Logout</strong></Button>
                    
                </div>
                {/* header end */}
                

                {/* button panels start */}
                <div style={{marginTop:'72px'}}> 
                    <FullWidthTabs /> 
                </div>


                
      
            </Auxiliary>
        )

    
}

export default withRouter(HomePage);
