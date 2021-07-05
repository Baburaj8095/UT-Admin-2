import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary';
import Footer from '../../Footer/Footer';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const NodataFound = () => {
    return (
        <Auxiliary>
            <div style={{backgroundColor:'#8FBC8B',width:'99.7%', height:'70%'}}>
                <div>
                    <h1 style={{marginLeft:'150px', color:'white'}}>No data found for the selected date. Please choose a different one<br/><span style={{marginLeft:'55px'}}>and make sure you're connected to an internet connection.</span></h1>
                    <SentimentVeryDissatisfiedIcon style={{marginLeft:'660px',marginTop:'30px',fontSize:'150px'}}/>
                </div>
            </div>

            <div style={{backgroundColor: 'grey', color:'white', position:'fixed',  width:'97%', marginTop:'45px', bottom:0, height:'140px'}}>
                <Footer />
            </div>
        </Auxiliary>
    )
}

export default NodataFound;
