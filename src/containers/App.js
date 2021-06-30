import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import HomePage from "../components/HomePage.js/HomePage";
import Login from "../hoc/Login/Login";
import AddCategoryLink from "../Links/AddCategoryLink/AddCategoryLink";
import AddProductsLink from "../Links/AddProductsLink/AddProductsLink";
import EditProduct from "../Links/EditProduct/EditProduct";
import ArchieveProduct from "../Links/ArchieveProduct/ArchieveProduct";
import OrderDetailsPage from '../components/TabPanel/OrderManagement/OrderDetailsPage';
import SeparateOrderManagement from '../components/TabPanel/OrderManagement/SeparateOrderManagement';


function App() {
  // style={{overflow:'hidden'}} disables scrollbar in all the pages
  return (
    <div style={{overflow:'hidden'}}>
     
    <Switch>
 
    
    {/* <ProtectedRoutes path="/homepage" component={HomePage} isAuth={isAuth}/>  */}
       
    <Route  path="/homepage" exact component={ withRouter(HomePage) } />
    <Route  path="/edit-product" exact component={ withRouter(EditProduct) } />
    <Route  path="/archieve-product" exact component={ withRouter(ArchieveProduct) } />
    <Route  path="/add-category" exact component={ withRouter(AddCategoryLink) } />
    <Route  path="/add-product" exact component={ withRouter(AddProductsLink) } />  
    <Route  path="/order-details" exact component={ withRouter(OrderDetailsPage) } />
    
    <Route  path="/orders" exact component={ withRouter(SeparateOrderManagement) } />
    <Route exact path="/" component={ withRouter(Login) } />

  </Switch>
</div>
       

  );
}

export default withRouter(App);
 //<Login /> use this the "/" page above