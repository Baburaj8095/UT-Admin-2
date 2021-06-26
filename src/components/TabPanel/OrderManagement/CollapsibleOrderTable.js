import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment';
import { reactLocalStorage } from 'reactjs-localstorage';


const useStyles = makeStyles({
  paper: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});




let paginate = '';

//inner table, using the props tableData passed from the OrderManagement.js
function Row(props) {

  const classes2 = useStyles();




//for pagination
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

const tableLength = reactLocalStorage.get('table_data_length');

paginate = (<TablePagination
rowsPerPageOptions={[10, 25, 100]}
component="div"
count={tableLength}
rowsPerPage={rowsPerPage}
page={page}
onChangePage={handleChangePage}
onChangeRowsPerPage={handleChangeRowsPerPage}
/>);

//end of pagination settings

  const { row } = props; //outer table data
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();



  return (
    <React.Fragment>
      <TableRow className={classes2.paper}>
              <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell cocomponent="th">{row.placedDate}</TableCell>
              <TableCell cocomponent="th">{row.status}</TableCell>
              <TableCell cocomponent="th">{row.customer.firstName}</TableCell>
              <TableCell cocomponent="th">{ moment(row.deliveryInfo.slotStart).format('YYYY-MM-DD')} - { moment(row.deliveryInfo.slotEnd).format('YYYY-MM-DD')}</TableCell>
      </TableRow>
       {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
             <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}

      
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };



const CollapsibleOrderTable = (props)=> {

  const data = props.tableData; //data passed as props in OrderManagement.js
  reactLocalStorage.set('table_data_length', data.length);

  const classes2 = useStyles();


  return (
    <Paper className={classes2.paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{backgroundColor:'#E6E6FA', textAlign:'center'}}>
            <TableCell />
            <TableCell style={{fontSize:'17px'}}>Order ID</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Order Date</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Status</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Customer Name</TableCell>
            <TableCell style={{fontSize:'17px'}} component="th">Delivery Slot</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
        
      </Table>
    </Paper>
  );
}


export default  CollapsibleOrderTable;