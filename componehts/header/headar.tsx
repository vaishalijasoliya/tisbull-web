import Grid from '@mui/material/Grid';
import styles from '../imdex/sing.module.scss'
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Box, Typography, Button, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import React, { useState } from 'react';



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
        <AppBar position="static" className={styles.listnewbarhedar}>
          <Container maxWidth="xl" className={styles.cantenar_list_caps}>

            <Toolbar disableGutters >
              <Grid item sm={6} md={4} xs={6}>
                <a href='./'>
                  <div>
                  <img src='../../new logo.png' width={190}></img>                   </div>
                </a>

              </Grid>
              <Grid item sm={6} md={8} xs={6} className={styles.ivonnewbar} display={'flex'} justifyContent={'end'}>
                <Box className={styles.menu_icom} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton

                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
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
                  </Menu>
                </Box>
                <Box className={styles.boxlistyyy} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                
                </Box>
                <Button
                  onClick={(() => { router.push('./login') })}
                  className={styles.btn_pages221}
                  sx={{ my: 2, display: 'block' }}
                >
                  Login
                </Button>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </Grid>

    </>
  )
}

export default main