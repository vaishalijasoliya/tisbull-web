import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';

import Newbar from '../componehts/newbar/newbar';
import Dashboard from '../componehts/dashboard/dashboard';
const ResponsiveAppBar = (props) => {
  console.log(props,'virlist');
  return (
    <Grid container className={styles.cantenar_list}>
    {/* <Grid md={12} sm={11} xs={12} >
    </Grid> */}
      <Grid item sm={12} md={12} xs={12}>
      <Newbar props={props}/>

        {/* <Newbar /> */}
        {/* <Home /> */}
        {/* <div className={styles.dasnod_camponat2}>
        <Dashboard  props={props}/>
        </div> */}
      </Grid>
    </Grid>
  )
}
// export default ResponsiveAppBar;
const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
      dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);
