import { Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './footer.module.scss'
const main = () => {
    return (
        <>

            <Grid container className={styles.listcontenar}>
                <Grid item sm={12} md={6} xs={12} display={'flex'}>
                    <div>
                        <div className={styles.tislogopeg}><img src='../../new logo.png' width={190} /></div>
                        <div className={styles.footertis}><Typography>TIS is technologically trading platform
                            for everyone. It provides automatic
                            trading for equity, currency and FO.  </Typography></div>
                        <div className={styles.listinsfesh}><img src='../../Vector (23).svg' width={36} />
                            <img src='../../Vector (24).svg' width={36} />
                            <img src='../../Vector (25).svg' />
                        </div>
                    </div>
                    <div className={styles.div2parsf}>
                        <div className={styles.tridingpere}><Typography>Trading With </Typography></div>
                        <div className={styles.zerrodhadata1}><a><img src='../../zerodha logo 1.svg' /><Typography>ZERODHA</Typography></a></div>
                        <div className={styles.zerrodhadata2}><a className={styles.listatecgid}><img src='../../kotak logo 1.svg' /><Typography className={styles.kotaktexy}>KOTAK SECURITIES</Typography></a></div>
                        <div className={styles.zerrodhadata}><a><img src='../../angel logo.png' width={36} /><Typography>ANGEL ONE</Typography></a></div>
                    </div>
                </Grid>
                <Grid item sm={12} md={6} xs={12} display={'flex'} justifyContent={'space-between'}>
                    <div className={styles.div1data}>
                        <div className={styles.abouutdiv}><Typography>About US</Typography></div>
                        <div className={styles.abouutdiv22}><Typography>Home</Typography>
                            <Typography>Blogs</Typography>
                            <Typography>Terms & Conditions</Typography>
                            <Typography>Privacy Policy</Typography>
                            <Typography>Support</Typography>
                            <Typography>Terms of Use</Typography>

                        </div>
                    </div>
                    <div>
                        <div className={styles.taypocontes}><Typography>Connect</Typography></div>
                        <div>
                        <a className={styles.listoffics}><img src='../../Group 1000003665.png' /><Typography>432, Amby Valley Arcade,
                            Uttran, Surat, Gujarat, India, 394105 </Typography> </a>
                        <a className={styles.listoffics}><img src='../../Vector (27).svg' /><Typography>+91 00000 00000  | +91 00000 00000</Typography> </a>
                        <a className={styles.listoffics}> <img src='../../Vector (28).svg' /><Typography>info@tisbull.com</Typography> </a>
                        </div>
                    </div>
                </Grid>
<Grid sm={12} md={12} xs={12}>
    <Typography className={styles.listperegaf}>Your capital is at risk. You should not spend more than you can afford to lose and should ensure that you fully understand the risks involved. Using the products offered may not be suitable for everyone. Before you use these products, please take into consideration your level of experience, financial objectives and seek independent advice if necessary. It is the responsibility of the Client to ascertain whether he/she is permitted to use the services of the TIS BULL brand based on the legal requirements in his/her country of residence.
</Typography>
</Grid>

            </Grid>
            <Grid container className={styles.listcontelastinpegs}>
            <Grid item sm={12} md={6} xs={12} display={'flex'} justifyContent={'end'}>
<Typography className={styles.listperagayuu}>© 2023 All Rights Reserved by TIS BULL</Typography>
            </Grid>
            <img src='../../_.svg' />
            <Grid item sm={12} md={5} xs={12} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
<Typography className={styles.listfootara}>Managed by<a>Think Info Services</a> </Typography>
<Button className={styles.btnlstdivangf}><img src='../../Vector (29).svg' width={26} height={26} /></Button>
            </Grid>
            </Grid>
        </>
    )
}

export default main