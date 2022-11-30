
// import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './sing.module.scss'
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Box, Typography, Button, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';

const pages = [<Button
  // onClick={(() => { router.push('./dashboard') })}
  className={styles.btn_pages2}
  // key={page}
  // onClick={handleCloseNavMenu}
  sx={{ my: 2, display: 'block' }}
>
  Home
</Button>, 
<Button
  // onClick={(() => { router.push('./dashboard') })}
  className={styles.btn_pages2}
  // key={page}
  // onClick={handleCloseNavMenu}
  sx={{ my: 2, display: 'block' }}
>
  About us
</Button>, 
<Button
  // onClick={(() => { router.push('./dashboard') })}
  className={styles.btn_pages2}
  // key={page}
  // onClick={handleCloseNavMenu}
  sx={{ my: 2, display: 'block' }}
>
  Contact
</Button>];

const main = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>

      <Grid container>
        <AppBar position="static">
          <Container maxWidth="xl" className={styles.cantenar_list_caps}>

            <Toolbar disableGutters>
              <Grid item sm={6} md={6} xs={6}>
                <div>
                  <img src='../../TISBULL 1.png'></img>
                </div>
              </Grid>
              {/* <Grid item sm={0} md={2} xs={0} display={'flex'} justifyContent={'end'}>
          </Grid> */}
              <Grid item sm={6} md={6} xs={6} className={styles.ivonnewbar} display={'flex'} justifyContent={'end'}>
                <Box className={styles.menu_icom} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton

                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                  // color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >

                    {pages.map((page) => (
                      <MenuItem
                      //  key={page}
                        onClick={handleCloseNavMenu}>

                        <Typography textAlign="center" className={styles.page_listmenu}>{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Box className={styles.boxlistyyy} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {/* {pages.map((page) => ( */}
                  <Button
                    // onClick={(() => { router.push('./dashboard') })}
                    className={styles.btn_pages2}
                    // key={page}
                    // onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: 'block' }}
                  >
                    Home
                  </Button>
                  <div className={styles.listinlog2}>

                    <Button
                      // onClick={(() => { router.push('./dashboard') })}
                      className={styles.btn_pages2}
                      // key={page}
                      // onClick={handleCloseNavMenu}
                      sx={{ my: 2, display: 'block' }}
                    >
                      About us
                    </Button>
                  </div>
                  <div className={styles.listinlog}>
                    <Button
                      // onClick={(() => { router.push('./dashboard') })}
                      className={styles.btn_pages2}
                      // key={page}
                      // onClick={handleCloseNavMenu}
                      sx={{ my: 2, display: 'block' }}
                    >
                      Contact
                    </Button>
                  </div>
                  <Button
                    // onClick={(() => { router.push('./dashboard') })}
                    className={styles.btn_pages}
                    // key={page}
                    // onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: 'block' }}
                  >
                    Login
                  </Button>

                </Box>

                {/* <Grid item sm={4} md={2} xs={4} display={'flex'} justifyContent={'end'}> */}

              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </Grid>

    </>
  )
}

export default main