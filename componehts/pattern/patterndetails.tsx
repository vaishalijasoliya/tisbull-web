import styles from "./patterndetail.module.scss";
import { Box, Grid, Typography } from "@mui/material";

export default function Summary() {
  return (
    <Grid container>
      <Grid item sm={12} md={12} xs={12}>
        <Box>
          <Box className={styles.flex}>
            <Box
              className={styles.flex + " " + styles.align + " " + styles.wid_1}
            >
              <Box>
                <Typography className={styles.typo_1}>SCRIPT</Typography>
                <Typography className={styles.typo_2}>AAPL</Typography>
              </Box>
              <Box className={styles.pad_1}>
                <Typography className={styles.typo_3}>NSE</Typography>
              </Box>
            </Box>
            <Box className={styles.wid_1 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>TYPE</Typography>
              <Typography className={styles.typo_2}>Basic</Typography>
            </Box>
            <Box className={styles.wid_1 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>Entry</Typography>
              <Typography className={styles.typo_2}>400</Typography>
            </Box>
            <Box className={styles.wid_1 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>Exit</Typography>
              <Typography className={styles.typo_2}>500</Typography>
            </Box>
            <Box className={styles.wid_2 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>Buy Diffrerance</Typography>
              <Typography className={styles.typo_2}>5</Typography>
            </Box>
            <Box className={styles.wid_2 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>
                Sell Diffrerance
              </Typography>
              <Typography className={styles.typo_2}>10</Typography>
            </Box>
            <Box className={styles.wid_1 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>Target</Typography>
              <Typography className={styles.typo_4}>600</Typography>
            </Box>
          </Box>

          <Box className={styles.flex + " " + styles.pad_top}>
            <Box className={styles.wid_1}>
              <Typography className={styles.typo_1}>StopLoss</Typography>
              <Typography className={styles.typo_2}>350</Typography>
            </Box>
            <Box className={styles.wid_1 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>Investment</Typography>
              <Typography className={styles.typo_2}>100k</Typography>
            </Box>
            <Box className={styles.wid_3 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>No. of Levels</Typography>
              <Typography className={styles.typo_2}>3</Typography>
            </Box>
            <Box className={styles.wid_1 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>Enter Point</Typography>
              <Typography className={styles.typo_2}>420</Typography>
            </Box>
            <Box className={styles.wid_2 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>Tick Type</Typography>
              <Typography className={styles.typo_2}>Fix</Typography>
            </Box>
            <Box className={styles.wid_4 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>Created At</Typography>
              <Typography className={styles.typo_5}>
                12/10/2022 10:10:12
              </Typography>
            </Box>
            <Box className={styles.wid_4 + " " + styles.pad_3}>
              <Typography className={styles.typo_1}>Edited At</Typography>
              <Typography className={styles.typo_5}>
                12/10/2022 10:10:12
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* <Box className={styles.border}></Box> */}
        <Box className={styles.flex + " " + styles.pad_top}>
          <Box>
            <Box className={styles.ty_box}>
              <Typography className={styles.typo}>Today’s Positions</Typography>
            </Box>
            <Box className={styles.flex}>
              <Box className={styles.wid_1}>
                <Typography className={styles.typo_1}>Profit</Typography>
                <Typography className={styles.typo_4}>410</Typography>
              </Box>
              <Box className={styles.wid_1 + " " + styles.pad_1}>
                <Typography className={styles.typo_1}>Loss</Typography>
                <Typography className={styles.typo_2}>-</Typography>
              </Box>
              <Box className={styles.wid_2 + " " + styles.pad_1}>
                <Typography className={styles.typo_1}>
                  Pending orders
                </Typography>
                <Typography className={styles.typo_2}>10</Typography>
              </Box>
              <Box className={styles.wid_1 + " " + styles.pad_1}>
                <Typography className={styles.typo_1}>Stock</Typography>
                <Typography className={styles.typo_2}>5</Typography>
              </Box>
            </Box>
          </Box>
          <Box className={styles.pad_5}>
            <Box className={styles.ty_box1}>
              <Typography className={styles.typo}>Overview</Typography>
            </Box>
            <Box className={styles.flex}>
              <Box className={styles.wid_1}>
                <Typography className={styles.typo_1}>Profit</Typography>
                <Typography className={styles.typo_4}>410</Typography>
              </Box>
              <Box className={styles.wid_1 + " " + styles.pad_1}>
                <Typography className={styles.typo_1}>Loss</Typography>
                <Typography className={styles.typo_2}>-</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* <Box className={styles.border}></Box> */}
        <Box className={styles.pad_top}>
          <Box className={styles.ty_box}>
            <Typography className={styles.typo}>Market Depth </Typography>
          </Box>
          <Box className={styles.flex}>
            <Box className={styles.wid_5}>
              <Typography className={styles.typo_1}>Open</Typography>
              <Typography className={styles.typo_2}>410</Typography>
            </Box>
            <Box className={styles.wid_5 + " " + styles.pad_1}>
              <Typography className={styles.typo_1}>Prev. Close</Typography>
              <Typography className={styles.typo_2}>450</Typography>
            </Box>
            <Box className={styles.wid_5 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>High</Typography>
              <Typography className={styles.typo_2}>400</Typography>
            </Box>
            <Box className={styles.wid_5 + " " + styles.pad_1}>
              <Typography className={styles.typo_1}>Low</Typography>
              <Typography className={styles.typo_2}>390</Typography>
            </Box>
            <Box className={styles.wid_5 + " " + styles.pad_1}>
              <Typography className={styles.typo_1}>Volumn</Typography>
              <Typography className={styles.typo_2}>50,000</Typography>
            </Box>
            <Box className={styles.wid_5 + " " + styles.pad_1}>
              <Typography className={styles.typo_1}>Market Cap </Typography>
              <Typography className={styles.typo_2}>
                612 <span className={styles.text}> ( Rs. Cr)</span>
              </Typography>
            </Box>
            <Box className={styles.wid_2 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>Upper Circuit</Typography>
              <Typography className={styles.typo_2}>600</Typography>
            </Box>
          </Box>
          <Box className={styles.flex + " " + styles.pad_top}>
            <Box className={styles.wid_5}>
              <Typography className={styles.typo_1}>Lower circuit</Typography>
              <Typography className={styles.typo_2}>350</Typography>
            </Box>
            <Box className={styles.wid_5 + " " + styles.pad_4}>
              <Typography className={styles.typo_1}>52 weeks high</Typography>
              <Typography className={styles.typo_2}>550</Typography>
            </Box>
            <Box className={styles.wid_6 + " " + styles.pad_2}>
              <Typography className={styles.typo_1}>52 weeks low</Typography>
              <Typography className={styles.typo_2}>290</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
