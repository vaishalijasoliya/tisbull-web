import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import Sing from '../componehts/Stocks/test';
import  Nevbarlogin  from '../componehts/imdex/nevbarlogin';
import { useRouter } from 'next/router';

// import Sing from '../tis_admin_web/componehts/imdex/test';
import { connect } from 'react-redux';

// import Newbar from '../componehts/newbar/newbar';
import Dashboard from  '../componehts/CreatePattern/pattdata';
const ResponsiveAppBar = (props) => {
    const router = useRouter();

  console.log(router.query,'gvvvvv');

  return (
    <Grid container className={styles.cantenar_list}>
      <Grid item sm={12} md={12} xs={12}>
      <Nevbarlogin />
      <div className={styles.singlistpsdii}>
      <Sing props={props}/>
      </div>
      <Dashboard  props=
        {props}
      />
        {/* <Newbar />
        <div className={styles.dasnod_camponat}>
     
        </div> */}
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