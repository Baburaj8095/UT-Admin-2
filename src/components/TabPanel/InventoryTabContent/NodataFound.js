import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary';
import Footer from '../../Footer/Footer';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const NodataFound = () => {
    return (
        <Auxiliary>
            <div style={{width:'100%', height:'70%',display:'flex',justifyContent:'center'}}>
                <div>
<img src={'https://ecom.xircular.io/admin/images/nodata.png'} />
<h3 style={{textAlign:'center'}}>No Data Found</h3>
                    </div>
            </div>

            <div style={{backgroundColor: 'grey', color:'white', position:'fixed',  width:'97%', marginTop:'45px', bottom:0, height:'140px'}}>
                <Footer />
            </div>
        </Auxiliary>
    )
}

export default NodataFound;
