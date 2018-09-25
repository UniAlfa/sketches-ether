import React from 'react';
import AuthProcess from '../shared/auth/AuthProcess';
import { NavLink } from 'react-router-dom';
import SideMenuBar from "./SideMenuBar";
import {withRouter} from 'react-router-dom'
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AccountCircle from '@material-ui/icons/AccountCircle';


const Auth = new AuthProcess();

class Header extends React.Component {

    render() {

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

                                {Auth.cani('logout')
                                    ? <React.Fragment>
                                        <Typography variant="button" color="textPrimary" className="hello__user">
                                            Hello, {Auth.getUser()}!
                                        </Typography>
                                        <IconButton color="primary">
                                            <AccountCircle />
                                        </IconButton>
                                        <Button className="btn__logout" onClick={() => { Auth.logout(); this.props.history.replace('/'); }} >Logout</Button>
                                    </React.Fragment>
                                    : <Button onClick={() => { this.props.history.replace('login'); }}>Login</Button>
                                }

                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Grid>
            </div>

        );
    }
}

export default withRouter(Header)