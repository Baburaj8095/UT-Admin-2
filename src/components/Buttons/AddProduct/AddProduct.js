import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function CustomizedButtons() {
  const classes = useStyles();

  return (
    <div>
      
      <ThemeProvider theme={theme}>
        <Button variant="outlined" color="primary" className={classes.margin}>
          Add Product
        </Button>
      </ThemeProvider>
     
    </div>
  );
}