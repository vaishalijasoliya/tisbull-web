// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import ChangePassedit from '../componehts/ChangePassedit/ChangePassedit';
import Newbar from './newbarlist';
import Setting from '../componehts/Setting/Setting';
// import { connect } from 'react-redux';
// import { useRouter } from 'next/router';


import Dashboard from '../componehts/dashboard/dashboard';
const ResponsiveAppBar = (props) => {
    console.log(props.props,'loghggygg');

    // const router = useRouter();
    // console.log(router.query.email,'router.query.email');
    return (
        <Grid container className={styles.cantenar_list3622}>
            <Grid item sm={12} md={12} xs={12}>
                <Newbar />
            </Grid>
            <Grid item sm={12} md={3} xs={12} className={styles.newbarend}>
                {/* <div className={styles.singlistpsdii}> */}
                <Setting props={props}/>
                {/* </div> */}
            </Grid>
            <Grid item sm={12} md={9} xs={12}>
            <div className={styles.singlistpsdii223352}>  
                <ChangePassedit props={props}/>
                </div>
            </Grid>
            {/* <Newbar />
        <div className={styles.dasnod_camponat}>
        <Dashboard />
        </div> */}

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