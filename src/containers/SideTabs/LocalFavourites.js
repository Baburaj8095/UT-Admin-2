import React,{Component} from 'react';
//import json_data from '../Pagination/fake_data.json';
import Paginator from 'react-paginate';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles';

import classes2 from './LocalFavourites.module.css';
import Spinner from '../../components/Spinner/Spinner';
import DottedMenu from '../../components/Buttons/DottedMenu/DottedMenu';
import {reactLocalStorage} from 'reactjs-localstorage';




const useStyles = theme=>({
    root: {
        maxWidth: 340,
       // minWidth:290,
        maxHeight: 390,
        // maxHeight: 330,
        margin: 9.8,
        
      },
      
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
  
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
});



class PaginatedData extends Component{

        state={
            dataItems:[],
            isLoading: false,
            pageNumber: 0,
    }
        

    //start of componentDidMount
   async componentDidMount(){

       console.log("cat id from paginatedData.js:", this.props.cId);
           
            this.setState({
                isLoading: true  
                });


            const api = "/products?page=0&productCategoryId.specified=true&productCategoryId.equals="+this.props.cId+"";

            const jwt = reactLocalStorage.get('id_token');
            const jwtToken ='Bearer '+jwt;


            axios.get(api, {
                headers: {
                'Authorization': jwtToken,
                'Accept' : '*/*',
                'Content-Type': 'application/json',
                'App-Token' : 'A14BC'
                }
            })
            .then(product => {
            //console.log("token inside the get method: ", this.state.token);
            console.log("product: ",product.data);
            this.setState({
                dataItems: product.data,
                isLoading: false,
                
                })
            })
            .catch(error =>{
                this.setState({
                    isLoading: false,
                    
                    });
                    });

   } //end of componentDidMount


    //method to change the paginator number
        changePage = ({selected}) =>{
                this.setState({pageNumber: selected})
            }



   render(){

    
    const {classes} = this.props;

    let itemsPerPage =11;

    if(this.state.dataItems.length <=5){
        itemsPerPage = 11;
    }else{
        itemsPerPage = 14;
    }
    
    const pagesVisited = this.state.pageNumber * itemsPerPage;

    const pageCount = Math.ceil(this.state.dataItems.length / itemsPerPage);
    let displayItems = '';
   

    //conditional rendering

    if(this.state.isLoading){
        return <Spinner />
    }else{

        displayItems = this.state.dataItems.slice(pagesVisited, pagesVisited + itemsPerPage)
                                           .map((product)=>{
    
                                            if(!product.archieved){
                                        
                                                return(

                                                        <Card className={classes.root} key={product.id} justify="center">
                                                            <CardContent>
                                                            <table>
                                                                <tr>
                                                                    <td>
                                                                        <div>
                                                                            {product.name}
                                                                        </div>
                                                                    </td>

                                                                    <th>
                                                                        <div style={{float:'right'}}>
                                                                            {/* <button className={classes2.CartButton} onClick={() => this.addToCartAction(product)}>Dot menu</button>   */}
                                                                            <DottedMenu name={product.name} product_id={product.id} desc={product.description} image={product.productImage} prodRank={product.rank} catId={product.productCategory.id} className={classes2.CartButton}/>
                                                                        </div>
                                                                    </th>
                                                                </tr>
                                                                                                                       
                                                                <tr>
                                                                    <td>
                                                                        <Typography className={classes.productName} color="textSecondary">
                                                                            {product.description.slice(0, 50)}...
                                                                            {/* <ReadMore desc={product.description}  style={{width:'20px', height:'20px'}}/> */}
                                                                        </Typography>
                                                                    </td> 
                                                            
                                                                    <th >
                                                                        <img src={product.productImage} alt={product.name} className={classes2.Images}/>
                                                                    </th>
                                                                </tr>
                                                                
                                                                </table>
                                                                                      
                                                            </CardContent>

                                                
                                                        </Card>

                                                    )
                                                }

                                                    
                                                    return null;

                                            } )

            }





   //final return of render()         
return (
    
    <div > 
           
           <Grid container  style={{margin:'5px', justifyContent: 'center'}}>
              {displayItems}
           </Grid> 

           
        <div style={{marginTop:'30px'}}>
            <Paginator
                previousLabel = {"<"}
                nextLabel = {">"}
                pageCount = {pageCount}
                onPageChange = {this.changePage}
                containerClassName={classes2.paginationButtons}
                previousLinkClassName = {classes2.previousButton}
                nextLinkClassName={classes2.nextButton}
                disabledClassName = {classes2.paginationDisabled}
                activeClassName = {classes2.activePageNumberButton}
                
                />

        </div>
                    
        </div>

        

)
                

   }

  


}

export default withStyles(useStyles) (PaginatedData);
// const isItems = users.length < 4 ? true : false;

    // const hideNextBtn = users.length >= pagesVisited ? true: false;

    // const hidePreBtn = pagesVisited <= 4 ? true: false;