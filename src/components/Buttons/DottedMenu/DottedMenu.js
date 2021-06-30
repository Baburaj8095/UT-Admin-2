import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router';
import {reactLocalStorage} from 'reactjs-localstorage';




const options = [
  'Edit',
  'Archieve',
  
];

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {


  const [productData, setProductData] = useState({
                                                  Pname:props.name,
                                                  Pdesc: props.desc,
                                                  Pimage: props.image
                                                  });

 
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



  const editProduct=()=>{
    history.push('/edit-product');
  }


  const archieveProduct=()=>{
    history.push('/archieve-product');
  }

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
            width: '12ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={ option === 'Edit' ? editProduct: archieveProduct}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}