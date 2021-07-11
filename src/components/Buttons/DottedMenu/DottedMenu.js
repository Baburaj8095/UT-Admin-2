import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router';
import {reactLocalStorage} from 'reactjs-localstorage';
import AddInventoryModalProductPage from './AddInventoryModalProductPage';




const options = [
  'Edit',
  'Archieve',
  'Add inventory'
  
];

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {

 
   reactLocalStorage.setObject("productData",{
                                                Pid: props.product_id,
                                                Pname:props.name,
                                                Pdesc: props.desc,
                                                Pimage: props.image,
                                                Prank:props.prodRank,
                                                PCatID: props.catId
                                                });
  

  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
     //add links here
  };

  const handleClose = () => {
    setAnchorEl(null);
   
  };
 

  // const checkChosenOption = (choice) =>{
  //   console.log("choice: ", choice.target.value)
  //   switch (choice) {
  //     case 'Edit':
  //       history.push('/edit-product');
  //       break;
  //     case 'Archieve':
  //       history.push('/archieve-product');
  //       break;
  //     case 'Add inventory':
  //       history.push('/add-inventory');
  //       break;
  //     default:
  //       window.alert("Invalid choice")
  //       break;
  //   }
  // }

    
//modal setup

  const [openModal, setOpenModal] = useState(false);


  const editProduct=()=>{
    history.push('/edit-product');
  }


  const archieveProduct=()=>{
    history.push('/archieve-product');
  }

  
  const addInventory = () =>{
    setAnchorEl(null);//to close down the small dialogue box
    setOpenModal(true)

  }


  // bar === 'a' ? 1 : // if 
  // bar === 'b' ? 2 : // else if 
  // bar === 'c' ? 3 : // else if
  // null // else 

   // bar === 'a' ? 1 : bar === 'b' ? 2 : bar === 'c' ? 3 : null

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '16ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={option === 'Edit' ? editProduct: option === 'Edit' ? archieveProduct : option === 'Add inventory' ? addInventory: null}>
            {option}
          </MenuItem>
        ))}
      </Menu>

      <AddInventoryModalProductPage 
          openModal={openModal}
          setOpenModal = {setOpenModal}
        />
    </div>
  );
}