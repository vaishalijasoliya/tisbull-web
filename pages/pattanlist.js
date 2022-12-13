// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import Newbar from './newbarlist';
import { connect } from 'react-redux';

import Stocks from '../componehts/Stocks/Stocks';
const ResponsiveAppBar = (props) => {
  return (
    <Grid container className={styles.cantenar_list265}>
      <Grid item sm={12} md={12} xs={12}>
        <Newbar />
        {/* <Home /> */}
        <div className={styles.dasnod_camponat366}>
        <Stocks  props={props}/>
        </div>
      </Grid>
    </Grid>
  )
}
 const mapStateToProps = (state) => ({
   profile: state.user.profile
 });

 const mapDispatchToProps = (dispatch) => ({
   save_user_data: (data) =>
      dispatch({ type: Types.LOGIN, payload: data }),
 });

 export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);
// export default ResponsiveAppBar;
