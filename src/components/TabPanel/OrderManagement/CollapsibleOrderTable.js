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

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}



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

paginate = (<TablePagination
rowsPerPageOptions={[10, 25, 100]}
component="div"
count={rows.length}
rowsPerPage={rowsPerPage}
page={page}
onChangePage={handleChangePage}
onChangeRowsPerPage={handleChangeRowsPerPage}
/>);

//end of pagination settings

  const { row } = props;
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
              <TableCell align="right">{row.placedDate}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.customer.firstName}</TableCell>
              <TableCell align="right">{ moment(row.deliveryInfo.slotStart).format('YYYY-MM-DD')} - { moment(row.deliveryInfo.slotEnd).format('YYYY-MM-DD')}</TableCell>
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


 


const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('', '', '', '','' , paginate),
];




const CollapsibleOrderTable = (props)=> {

  const data = props.tableData;

  const classes2 = useStyles();


  return (
    <Paper className={classes2.paper}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow style={{backgroundColor:'#E6E6FA', textAlign:'center'}}>
            <TableCell />
            <TableCell style={{fontSize:'17px'}}>Order ID</TableCell>
            <TableCell style={{fontSize:'17px'}} align="right">Order Date</TableCell>
            <TableCell style={{fontSize:'17px'}} align="right">Status</TableCell>
            <TableCell style={{fontSize:'17px'}} align="right">Customer Name</TableCell>
            <TableCell style={{fontSize:'17px'}} align="right">Delivery Slot</TableCell>
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