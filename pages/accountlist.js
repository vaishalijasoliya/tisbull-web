import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Types } from '../constants/actionTypes'
// import { connect } from 'react-redux';
import ApiServices from '../config/ApiServices';
import ApiEndpoint from '../config/ApiEndpoint';
import Newbar from './newbarlist';
import Accounttype from '../componehts/Stocks/accounttype';
const ResponsiveAppBar = (props) => {
  console.log(props.profile.accountId,'vssssir');
  const router = useRouter();

 
  return (
    <Grid container className={styles.cantenar_list88}>
      <Grid item sm={12} md={12} xs={12}>
        <Newbar />
        {/* <Home /> */}
        <div className={styles.dasnod_camponat266}>
        <Accounttype  props={props}/>
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
