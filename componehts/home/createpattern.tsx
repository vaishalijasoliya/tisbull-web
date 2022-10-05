import Head from 'next/head'
import Image from 'next/image'
import styles from './createpattern.module.scss'
import Grid from '@mui/material/Grid';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Radio from '@mui/material/Radio';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function Home() {
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    return (
        <Grid container className={styles.cantenar_list12}>
            <Grid item sm={12} md={12} xs={12}>
                <Box className={styles.listyylistms}>
                    <form>
                        <div>
                            <Radio
                                color="success"
                                checked={selectedValue === 'a'}
                                onChange={handleChange}
                                value="a"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                            <Radio
                                color="success"
                                checked={selectedValue === 'b'}
                                onChange={handleChange}
                                value="b"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'B' }}
                            />
                        </div>
                        <div className={styles.inputlistcom}>
                            <TextField id="outlined-basic" label="Production Consumer Key" variant="outlined" />
                        </div>
                    </form>
                </Box>

            </Grid>
        </Grid>
    )
}
