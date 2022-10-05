import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import styles from './newbar.module.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useRouter } from 'next/router';

const pages = ['Dashboard', 'Account', 'Equity', 'Currency', 'FO'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" className={styles.cantenar_list_caps}>

        <Toolbar disableGutters>
          <Grid item sm={4} md={4} xs={4}>
            <div>
              <img src='../../TISBULL 1.png'></img>
            </div>
          </Grid>
          <Grid item sm={0} md={2} xs={0} display={'flex'} justifyContent={'end'}>
          </Grid>
          <Grid item sm={8} md={6} xs={8} display={'flex'} justifyContent={'end'}>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                className={styles.menu_icom}
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
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" className={styles.page_listmenu}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* {pages.map((page) => ( */}
              <Button
                onClick={(() => { router.push('./dashboard') })}
                className={styles.btn_pages}
                // key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
              >
                Dashboard
              </Button>
              <Button
                onClick={(() => { router.push('./home') })}
                className={styles.btn_pages}
                // key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
              >
                Account
              </Button>
              <Button
                className={styles.btn_pages}
                // key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
              >
                Equity
              </Button>
              <Button
                className={styles.btn_pages}
                // key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
              >
                Currency
              </Button>
              <Button
                className={styles.btn_pages}
                // key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
              >
                FO
              </Button>
            </Box>

            {/* <Grid item sm={4} md={2} xs={4} display={'flex'} justifyContent={'end'}> */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <div className={styles.newbar_list}>
                  <div className={styles.Avatar_newbar}>
                    <Avatar className={styles.btn_avtar_list}></Avatar>
                  </div>
                  <div className={styles.user_list}>
                    <Typography>
                      mirav
                    </Typography>
                  </div>
                  <div>
                    <Button className={styles.alt_list_ikon} onClick={handleOpenUserMenu}>
                      <ExpandMoreIcon />
                    </Button>
                  </div>

                </div>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
