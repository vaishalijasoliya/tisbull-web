
import { Avatar, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './adv.module.scss'
const adv = () => {
  return (
    <>

      <Grid container>
        <Grid item sm={12} md={4} xs={12}>
          <div className={styles.new_listoeregsrsf}>
            <Typography>
              We Provide You the <samp>Best</samp>
            </Typography>
          </div>
        </Grid>
        <Grid item sm={12} md={4} xs={12}>
          <Box className={styles.box_2div}>
            <div className={styles.peregarf_maen}>
              <Typography >
                Advance Support
              </Typography>
            </div>
            <div className={styles.peregarf_no2}>
              <Typography>
                We are trusted and supported for multi broker
              </Typography>
            </div>
            <div className={styles.Avatar_userlistbox}>
            </div>
          </Box>
        </Grid>
        <Grid item sm={12} md={4} xs={12}>
          <Box className={styles.box_2div}>
            <div className={styles.peregarf_maen}>
              <Typography >
                Advance Automation
              </Typography>
            </div>
            <div className={styles.peregarf_no2}>
              <Typography>
                We are providing automation order with less user efforts.
              </Typography>
            </div>
            {/* <div> */}
            <div className={styles.Avatar_userlistbox}>
           

            </div>

          </Box>
        </Grid>
      </Grid>

    </>
  )
}
export default adv