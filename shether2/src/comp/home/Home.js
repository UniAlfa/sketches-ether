import React from 'react';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from "@material-ui/core/Paper/Paper";

class HomePage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Paper>
                    <Typography variant="display1" align="center">
                        Стартовая страница
                    </Typography>
                    <React.Fragment>
                        <Typography variant="headline" gutterBottom>
                            Sketch 'sbrhether2' (v03.09.2018) is up and running
                        </Typography>
                        <Typography variant="subheading">
                            Ссылки меню активны
                        </Typography>
                    </React.Fragment>
                </Paper>

            </React.Fragment>

        );
    }
}

export default HomePage;