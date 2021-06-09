import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import ProductTabContent from './ProductTabContent';




const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#32CD32',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    marginLeft: '15px',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#32CD32',
      opacity: 1,
    },
    '&$selected': {
      color: 'black',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'black',
    },
  },
  selected: {},
})) ((props) => <Tab disableRipple {...props} />);



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  
}));

export default function CustomizedTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>

      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Product" {...anyProps(0)}/>
          <AntTab label="Inventory" {...anyProps(1)}/>
          <AntTab label="Delivery Time slot" {...anyProps(2)}/>
          <AntTab label="Order Management" {...anyProps(3)}/>
        </AntTabs>
        <Typography className={classes.padding} />
      </div>

      <div
        index={value}
        onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}  style={{marginTop: '-35px'}}>
          <h4 style={{opacity: '0.8', marginBottom: '10px', marginLeft: '10px'}}>Category</h4>
            <ProductTabContent />
          </TabPanel>
          <TabPanel value={value} index={1} >
            Inventory
          </TabPanel>
          <TabPanel value={value} index={2} >
            Delivery Time slot
          </TabPanel>
          <TabPanel value={value} index={3} >
            Order Management
          </TabPanel>
      </div>
    </div>
  );
}





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};





function anyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}