// import style from '../styles/login.module.css'
// import Signin from '../component/signin.js'
import { Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './Features.module.scss'
const main = () => {
    return (
        <>

            <Grid container className={styles.listcontenardata}>

                <Grid item sm={12} md={12} xs={12}>
                    {/* <Box> */}
                    <div className={styles.heding_features}>
                        <Typography>
                            Features
                        </Typography>
                    </div>
                    <div className={styles.heding_features_p}>
                        <Typography>
                            We prodive you the safe and secure platform to manage your funds
                        </Typography>
                    </div>
                </Grid>
                <Grid item sm={12} md={4} xs={12} >
                    <div className={styles.containar_fea}>
                        <div className={styles.img_text_div122}>
                            <div>
                                <img src='../../Group 42.png' />
                            </div>
                            <div className={styles.chart_text}>
                                <Typography>
                                Trade in equities, currencies, futures
                                </Typography>
                                <Typography className={styles.nonpeeegarf}>
                                The application provides trading services across equities, currencies, futures.
                                                    </Typography>
                            </div>
                        </div>
                        <div className={styles.img_text_div1}>
                            <div>
                                <img src='../../Group 45.png' />
                            </div>
                            <div className={styles.chart_text}>
                                <Typography>
                                Emotionless Trading
                                </Typography>
                                <Typography className={styles.nonpeeegarf}>
                                It carries out the trades on mathematical calculation of automatically eliminating the psychology or emotions like fear, indecisiveness, impatience which sometimes can lead to unwanted results.
                                    </Typography>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={12} md={4} xs={12}>
                    <div className={styles.containar_fea}>
                        <div className={styles.img_text_div}>
                            <div>
                                <img src='../../Group 43.png' />
                            </div>
                            <div className={styles.chart_text}>
                                <Typography>
                                Step wise automatic trading
                                                    </Typography>
                                                    <Typography className={styles.nonpeeegarf}>
                                                    It performs step wise trades of buy and sell according to the changes taking place in the market, which results increase in the overall rate of returns.
                                                    </Typography>
                            </div>
                        </div>
                        <div className={styles.img_text_div}>
                            <div>
                                <img src='../../Group 46.png' />
                            </div>
                            <div className={styles.chart_text}>
                                <Typography>
                                Control in your hands
                                </Typography>
                                <Typography className={styles.nonpeeegarf}>

                                In spite of being fully automatical, Genomic Trader provides users to pause ongoing pattern, stop buy/sell orders and exit market which maybe sometime useful in volatile stocks and to gain short term profits.
                                    </Typography>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={12} md={4} xs={12}>
                    <div className={styles.containar_fea}>
                        <div className={styles.img_text_div3}>
                            <div>
                                <img src='../../Group 44.png' />
                            </div>
                            <div className={styles.chart_text}>
                                <Typography>
                                View live notional profit/loss
                                   </Typography>
                                   <Typography className={styles.nonpeeegarf}>
                                   Real time notional profit/loss data can be viewed in the application which provides ease and managment of funds for users.
                                                    </Typography>
                            </div>
                        </div>
                        <div className={styles.img_text_div3}>
                            <div>
                                <img src='../../Group 47.png' />
                            </div>
                            <div className={styles.chart_text}>
                                <Typography>
                                    Chart based representation
                                </Typography>
                                <Typography className={styles.nonpeeegarf}>

                                Investments in pattern, gold and available funds is represented in chart form as well as profit is represented in bar-chart format for the ease of users.
                                    </Typography>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>

        </>
    )
}

export default main