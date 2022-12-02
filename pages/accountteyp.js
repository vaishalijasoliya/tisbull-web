import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Newbar from './newbarlist';
import Accounttype from '../componehts/Stocks/accounttype';
const ResponsiveAppBar = (props) => {
  // console.log(props.profile.userData.currentAccount.id,'vssssir');
  const router = useRouter();

  useEffect(() => {
    getRequestToken();
  }, [router.isReady])

  const getRequestToken = () => {
    const request_token = router.query.request_token;
    console.log(request_token, 'request_token');
    if (!!request_token) {
      updateAccessToken(request_token)
    }
  }

  const updateAccessToken = async (token) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    var body = {
      request_token: token,
      id_account:props.profile.userData.currentAccount.id
    }
    props.loaderRef(true)
    var updateAccount = await ApiServices.PostApiCall(ApiEndpoint.UPDATE_ACCESS_TOKEN, JSON.stringify(body), headers)
    props.loaderRef(false)
    console.log('updateAccount...', updateAccount)
  }
  return (
    <Grid container className={styles.cantenar_list88}>
      <Grid item sm={12} md={12} xs={12}>
        <Newbar />
        {/* <Home /> */}
        <div className={styles.dasnod_camponat266}>
        <Accounttype className={styles.accolistmenu}  props={props}/>
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
