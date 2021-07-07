import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary';
import Footer from '../../Footer/Footer';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const NoSearchFound = () => {
    return (
        <Auxiliary>
            <div style={{backgroundColor:'#8FBC8B', marginLeft:'-150px',width:'123%', height:'110%'}}>
                <div>
                    <h1 style={{marginLeft:'120px', color:'white'}}>No data found for your search. Try with a different product name.</h1>
                    <SentimentVeryDissatisfiedIcon style={{marginLeft:'650px',marginTop:'30px',fontSize:'150px'}}/>
                </div>
            </div>
        </Auxiliary>
    )
}

export default NoSearchFound;
