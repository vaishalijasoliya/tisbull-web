import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import Home from "./support/Support";

import Newbar from '../componehts/newbar/newbar';
// import Support from '../componehts/Support/Support';
const ResponsiveAppBar = (props) => {
  console.log(props,'vir');
  return (
    <Grid container className={styles.cantenar_list8834}>
      <Grid item sm={12} md={12} xs={12}>
        <Newbar />
        {/* <Home /> */}
        <div className={styles.dasnod_camponat26634}>
        {/* <Grid xs={12} sm={8} md={9} className='maenedit'> */}
                        {/* <Header data={data} props={props}/> */}
                        <Home props={props} />
                    {/* </Grid> */}
        {/* <Support className={styles.accolistmenu}  props={props}/> */}
        </div>
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
