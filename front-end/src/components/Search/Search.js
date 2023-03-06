import React from "react";
import styles from "./Search.module.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Search() {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Grid className={styles.gridContainer} container>
                <Grid item xs={1} />
                <Grid item xs={8}>
                    <TextField
                        id="outlined-search"
                        label="Enter your search term"
                        type="search"
                        variant="outlined"
                        className={styles.searchTextField}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" 
                        color="primary" 
                        className={styles.searchButton}
                        fullWidth
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Search;