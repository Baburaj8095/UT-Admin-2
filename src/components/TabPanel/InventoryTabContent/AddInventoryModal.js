import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const styles = (theme) => ({
  modal: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.modal} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton  className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  modal: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


const DialogActions = withStyles((theme) => ({
  modal: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);





const AddInventoryModal = (props) => {

    const {openModal, setOpenModal} = props;

  

    const handleClose = () => {
        setOpenModal(false);
      };
    

  return (
    <div >
      <Dialog  onClose={handleClose} aria-labelledby="customized-dialog-title" open={openModal}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Inventory
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="product_name"
            label="Product Name"      
            placeholder="product name...."
            fullWidth
            
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
          />
          <TextField
          type="number"
            autoFocus
            margin="dense"
            id="unit_name"
            label="Unit Name"      
            placeholder="unit name...."
            fullWidth
            style={{marginTop:'30px'}}
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
          />

        <TextField
          type="number"
            autoFocus
            margin="dense"
            id="price"
            label=" Price"      
            placeholder="price...."
            fullWidth
            style={{marginTop:'30px'}}
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
          />

        <TextField
          type="number"
            autoFocus
            margin="dense"
            id="stock"
            label="Stock"      
            placeholder="stock...."
            fullWidth
            style={{marginTop:'30px'}}
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
          />

          <TextField
            type="number"
            autoFocus
            margin="dense"
            id="total_stock"
            label="Total Stock"      
            placeholder="total stock...."
            fullWidth
            style={{marginTop:'30px'}}
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
          />

          <TextField
            type="number"
            autoFocus
            margin="dense"
            id="unit_value"
            label="Unit Value"      
            placeholder="unit value...."
            fullWidth
            style={{marginTop:'30px'}}
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color:'green'}}>
            Save
          </Button>
          <Button onClick={handleClose} style={{color:'red'}}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default  AddInventoryModal;