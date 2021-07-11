import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });


const ParsedExcelDataTable = (props) => {

    const data = props.tableDATA;

    const classes = useStyles();


return (
        <div style={{marginTop:'20px', width:'1000px'}}>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                   
                        <TableCell
                            align="left"
                            style={{ minWidth: "10px", fontSize:'17px' }}
                        >
                            Product Name
                        </TableCell>

                        <TableCell
                            align="left"
                            style={{ minWidth: "10px", fontSize:'17px' }}
                        >
                            Description
                        </TableCell>

                        <TableCell
                            align="left"
                            style={{ minWidth: "10px", fontSize:'17px' }}
                        >
                            Product Image
                        </TableCell>

                        <TableCell
                            align="left"
                            style={{ minWidth: "10px", fontSize:'17px' }}
                        >
                            Archieved ?
                        </TableCell>

                        <TableCell
                            align="left"
                            style={{ minWidth: "20px", fontSize:'17px' }}
                        >
                            Product Rank
                        </TableCell>

                        <TableCell
                            align="left"
                            style={{ minWidth: "160px", fontSize:'17px' }}
                        >
                            Date Inventory ?
                        </TableCell>

                        <TableCell
                            align="left"
                            style={{ minWidth: "130px", fontSize:'17px' }}
                        >
                            Category ID
                        </TableCell>
                  
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => {

                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.sl_no}>
                                    <TableCell key={row.sl_no}>
                                        {row.prod_name}
                                    </TableCell>

                                    <TableCell key={row.sl_no}>
                                        {row.description}
                                    </TableCell>

                                    <TableCell key={row.sl_no}>
                                        <img src={row.productImage} width="50px" height="50px" alt={row.prod_name}/>
                                        
                                    </TableCell>

                                    <TableCell key={row.sl_no}>
                                        {row.archieved}
                                    </TableCell>

                                    <TableCell key={row.sl_no}>
                                        {row.rank}
                                    </TableCell>

                                    <TableCell key={row.sl_no}>
                                        {row.dateInventory}
                                    </TableCell>

                                    <TableCell key={row.sl_no}>
                                        {row.product_category_id}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                        }
                   
                </TableBody>
                </Table>
            </TableContainer>
            
            </Paper>
        </div>
    )
}

export default ParsedExcelDataTable
