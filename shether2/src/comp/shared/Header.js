import React from 'react';
import { NavLink } from 'react-router-dom';
import SideMenuBar from "./SideMenuBar";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import SearchIcon from '@material-ui/icons/Search';
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";


const Header = (props) => {
    return (
        <div style={{flexGrow: 1}}>
            <Grid container spacing={24} style={{ justifyContent: "center" }}>
                <Grid
                    item
                    xs={11}
                    s={10}
                    md={11}
                    style={{
                        justifyContent: "center",
                        flexBasis: "100%",
                        maxWidth: "100%"
                    }}
                >
                    <AppBar position="static" className="header">
                        <Toolbar className="toolbar">
                            <SideMenuBar />

                            <NavLink className="sberbank-logo" to="/" target="_blank" rel="noreferrer noopener" alt="logo">
                            </NavLink>

                            <div
                                className="eth-logo"
                                alt=""
                            />
                            <Typography variant="title" style={{flexGrow: 1}} />

                            <Button>Login</Button>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
        </div>

    );
};

export default Header;
