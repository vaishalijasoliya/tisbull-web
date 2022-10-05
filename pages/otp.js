import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import Otp from '../componehts/imdex/otp';
import Newbar from '../componehts/newbar/newbar';
import  Nevbarlogin  from '../componehts/imdex/nevbarlogin';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';


import Dashboard from '../componehts/dashboard/dashboard';
const ResponsiveAppBar = (props) => {
    const router = useRouter();
    console.log(router.query.email,'router.query.email');
    return (
    <Grid container className={styles.cantenar_list}>
      <Grid item sm={12} md={12} xs={12}>
      <Nevbarlogin />
      <div className={styles.singlistpsdii}>
      <Otp props={props}  email = {router.query.email}/>
      </div>
        {/* <Newbar />
        <div className={styles.dasnod_camponat}>
        <Dashboard />
        </div> */}
      </Grid>
    </Grid>
  )
}
// const mapStateToProps = (state) => ({
//     profile: state.user.profile
//   });
 
//   const mapDispatchToProps = (dispatch) => ({
//     save_user_data: (data) =>
//        dispatch({ type: Types.LOGIN, payload: data }),
//   });
 
//   export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);
export default ResponsiveAppBar