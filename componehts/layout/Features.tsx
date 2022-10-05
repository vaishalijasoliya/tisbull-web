// import style from '../styles/login.module.css'
// import Signin from '../component/signin.js'
import { Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './Features.module.scss'
const main = () => {
    return (
        <>

            <Grid container >

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
                        <div className={styles.img_text_div1}>
                            <div>
                                <img src='../../Group 42.png' />
                            </div>
                            <div className={styles.chart_text}>
                                <Typography>
                                    Chart based representation
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.img_text_div1}>
                            <div>
                                <img src='../../Group 45.png' />
                            </div>
                            <div className={styles.chart_text}>
                                <Typography>
                                    Chart based representation
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
                            </div>
                        </div>
                        <div className={styles.img_text_div}>
                            <div>
                                <img src='../../Group 46.png' />
                            </div>
                            <div className={styles.chart_text}>
                                <Typography>
                                    Step wise automatic trading
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
                                    Chart based representation
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
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>

        </>
    )
}

export default main