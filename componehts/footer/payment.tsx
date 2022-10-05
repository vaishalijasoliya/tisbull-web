// import style from '../styles/login.module.css'
// import Signin from '../component/signin.js'
import { Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import styles from './payment.module.scss'
const main = () => {
    return (
        <>

            <Grid container>
                <Grid item sm={12} md={4} xs={12}>
                    {/* <div>
                        <img src='../../Ellipse 16.png'/>
                    </div> */}
                    <div className={styles.affordable_text}>
                        <Typography>
                            Affordable Pricing
                        </Typography>
                    </div>
                </Grid>
                {/* <Grid item md={1} sm={0} xs={0}></Grid> */}
                <Grid item sm={12} md={8} xs={12}>
                    <Box className={styles.box_com_mobali}>
                        <div className={styles.box_maen_peg}>
                            <div className={styles.group_div}>
                                <div className={styles.disple_divlist}>
                                    <div className={styles.ikon_r}>
                                        <CurrencyRupeeIcon />
                                    </div>
                                    <div className={styles.payment_rupe}>
                                        <Typography>
                                            20
                                        </Typography>
                                    </div>
                                </div>
                                <div className={styles.intraday_text}>
                                    <Typography>
                                        Intraday and F&O trades
                                    </Typography>
                                </div>
                                <div className={styles.all_list}>
                                    <Typography>
                                        All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.
                                    </Typography>
                                </div>
                            </div>
                            <div className={styles.line_box}>
                                <img src='../../Vector 1.png' />
                            </div>
                            <div className={styles.group_div}>
                                <div className={styles.disple_divlist}>
                                    <div className={styles.ikon_r}>
                                        <CurrencyRupeeIcon />
                                    </div>
                                    <div className={styles.payment_rupe}>
                                        <Typography>
                                            0
                                        </Typography>
                                    </div>
                                </div>
                                <div className={styles.intraday_text}>
                                    <Typography>
                                        Free equity delivery
                                    </Typography>
                                </div>
                                <div className={styles.all_list}>
                                    <Typography>
                                        All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Grid>
            </Grid >

        </>
    )
}

export default main