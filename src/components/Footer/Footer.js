import React from 'react';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';


import  './Footer.module.css';

const Footer = () => {
    return (
        <div className="page-container">
        <div className="main-footer">
            <div className="container" style={{marginLeft:'270px'}}>

                <div className="row">
                        {/* column 1 */}
                        <div className="col">
                        <span style={{marginLeft:'40px'}}>  <BusinessIcon /></span>
                            <ul className="list-unstyled">
                                <li>Xircular pte ltd</li>
                                <li>P.O.Box 147 2546 Sociosqu Rd</li>
                                <li>East Region Singapore 02913</li>
                            </ul>
                        </div>
               

                
                        {/* column 2 */}
                        <div className="col" style={{marginLeft:'50px'}}>
                        <span style={{marginLeft:'30px'}}> <PhoneIcon /> </span>
                            <ul className="list-unstyled">
                                <li>800 120 7154</li>
                                <li>800 854 4578</li>
                               
                                <li style={{marginLeft:'-90px'}}>
                                <br/>
                                    <p className="col-sm">
                                        Powered by Xircular pte ltd &copy;{new Date().getFullYear()}
                                    </p>
                                </li>
                            </ul>
                        </div>
            


                
                        {/* column 3 */}
                        <div className="col">
                           <span style={{marginLeft:'70px'}}><EmailIcon /></span>
                            <ul className="list-unstyled">
                                <li>edward154@gmail.com</li>
                                <li>paulpogbai187@gmail.com</li>
                            </ul>
                        </div>             
             
                    </div>

            </div>
            
        </div>
        </div>
    )
}

export default Footer
