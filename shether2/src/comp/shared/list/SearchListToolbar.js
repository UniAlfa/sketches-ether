import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {lighten} from "@material-ui/core/es/styles/colorManipulator";
import withStyles from "@material-ui/core/es/styles/withStyles";
import SearchIcon from "@material-ui/icons/Search";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";


const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85)
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark
            },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: "0 0 auto"
    }
});

const theme = createMuiTheme({});

let SearchListToolbar = props => {
    const { numSelected, classes, handleSearch } = props;

    return (
        <Toolbar
            style={{ backgroundColor: "#3eac51" }}
            className={classes.root}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subheading">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        variant="title"
                        id="tableTitle"
                        style={{ color: "#fff", fontSize: "0.9rem" }}
                    >
                        Онлайн-таблица
                    </Typography>
                )}
            </div>

            <div className={classes.spacer} />
            <form className={classes.container} noValidate autoComplete="off">
                <MuiThemeProvider theme={theme}>
                    <TextField
                        id="search"
                        label="Поиск"
                        type="search"
                        className={''}
                        onChange={handleSearch}
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                </MuiThemeProvider>
            </form>
        </Toolbar>
    );
};

export default withStyles(toolbarStyles)(SearchListToolbar);
