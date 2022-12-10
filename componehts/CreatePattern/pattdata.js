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
// import { getInitials } from '../../utils/get-initials';

export const CustomPatternList = ({ patterns, ...rest }) => {

  return (
    <Card {...rest}>
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
              {patterns.map((pattern, index) => (
                <TableRow
                  key={index + 1}
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
                        {index + 1}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {pattern.buyPrice}
                  </TableCell>
                  <TableCell>
                    {pattern.sellPrice}
                  </TableCell>
                  <TableCell>
                    {pattern.buy_qty}
                  </TableCell>
                  <TableCell>
                    {pattern.sell_qty}
                  </TableCell>
                  <TableCell>
                    {pattern.buyingPrice}
                  </TableCell>
                  <TableCell>
                    {pattern.sellingPrice}
                  </TableCell>
                  <TableCell>
                    {pattern.gross}
                  </TableCell>
                  <TableCell>
                    {pattern.stock}
                  </TableCell>
                  <TableCell>
                    {pattern.investment}
                  </TableCell>
                  <TableCell>
                    {pattern.sDisc}
                  </TableCell>
                  <TableCell>
                    {pattern.Avg}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

CustomPatternList.propTypes = {
  patterns: PropTypes.array.isRequired
};
