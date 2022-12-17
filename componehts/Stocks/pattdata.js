import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';

const CustomPatternList = (props ) => {
  console.log(props,'bbbbbbbb');
const patterns ={}
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Step
                </TableCell>
                <TableCell>
                  Buy
                </TableCell>
                <TableCell>
                  Sell
                </TableCell>
                <TableCell>
                  Buy Qty
                </TableCell>
                <TableCell>
                  Sell Qty
                </TableCell>
                <TableCell>
                  Buy(₹)
                </TableCell>
                <TableCell>
                  Sell(₹)
                </TableCell>
                <TableCell>
                  Gross
                </TableCell>
                <TableCell>
                  Stock
                </TableCell>
                <TableCell>
                  Investment
                </TableCell>
                <TableCell>
                  S. Disc
                </TableCell>
                <TableCell>
                  Avg
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {patterns.map((pattern, index) => ( */}
                <TableRow
                  // key={index + 1}
                  hover
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {/* {index + 1} */}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
export default CustomPatternList
// CustomPatternList.propTypes = {
//   patterns: PropTypes.array.isRequired
// };
