import style from "./todayorder.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

export default function TodayOrder() {
  return (
    <Grid container>
      <Grid item sm={12} md={12} xs={12}>
        <Box>
          <Box className={style.flex + " " + style.wid_1}>
            <Box className={style.flex + " " + style.wid_2}>
              <Box>
                <Typography className={style.typo}>Today’s orders</Typography>
              </Box>
              <Box className={style.mar_1}>
                <Button className={style.btn}>Open</Button>
                <Button className={style.btn_1}>Trade</Button>
              </Box>
            </Box>
            <Box className={style.wid_2 + " " + style.align}>
              <IconButton size="large" aria-label="search" color="inherit">
                <SearchIcon className={style.search} />
              </IconButton>
              <Button>
                <img src="../../Vector (3).svg" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
