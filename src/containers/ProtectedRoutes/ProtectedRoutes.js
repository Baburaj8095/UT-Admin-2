import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoutes = ({isAuth: isAuhtorized, component: Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={(props) =>{
            if(isAuhtorized){
                return <Component />;
            }else{
                return(
                    <Redirect to={ {pathname: "/", state: {from:props.location} }} />
                );
            }
        }} />
    )
}

export default ProtectedRoutes
