import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import style from '../../styles/support.module.css'
import Btnsearch from '../support/searchbtn'
import { useTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


const tabtheme = createTheme({
    palette: {
        primary: {
            main: '#45A7A5'
        },
    },
});




function TabPanel(props = TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (


        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index = number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event = React.SyntheticEvent, newValue = number) => {
        setValue(newValue);
    };

    return (
        <>
            <div className={style.msgmain}>
                <ThemeProvider theme={tabtheme}>

                    <div className={style.msgdiv}>
                        {/* <h1 className={style.msgtitel}>Message</h1> */}
                        {/* <Btnsearch /> */}
                        {/* <img src='./image/Search.svg' className={style.searchicon}/> */}
                    </div>
                    <div><Btnsearch /></div>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" theme={tabtheme} sx={{ borderBottom: '2px solid #EAEAEA' }} scrollButtons={{ marginBottom: '-2px !important' }} >
                                <Tab label="All" {...a11yProps(0)} className={style.MuiTabroot} />
                                <Tab label="Archive" className={style.MuiTabroot} {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                       
                    </Box>
                </ThemeProvider>
            </div>

        </>
    );
}

