import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import Forgotpass from '../componehts/imdex/forgotpass';
import Newbar from './newbarlist';
import Dashboard from '../componehts/dashboard/dashboard';
import  Nevbarlogin  from '../componehts/imdex/nevbarlogin';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';


const Home = (props) => {

  
// export default function Home(props) {
  return (
    <Grid container className={styles.cantenar_list}>
      <Grid item sm={12} md={12} xs={12}>
      <Nevbarlogin />
      <div className={styles.singlistpsdii}>
      <Forgotpass props={props}/>
      </div>
        {/* <Newbar />
        <div className={styles.dasnod_camponat}>
        <Dashboard />
        </div> */}
      </Grid>
    </Grid>
  )
}
const mapStateToProps = (state) => ({
  profile: state.user.profile,
  // {console.log( state.user.profile,'profile')}
});
// {}

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);