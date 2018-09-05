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
                    <Typography variant="headline" align="center" style={{"paddingTop": "1rem"}}>
                        Стартовая страница
                    </Typography>
                    <React.Fragment>
                        <Typography variant="subheading" gutterBottom style={{"textAlign": "center", "paddingTop": "2rem"}}>
                            Sketch 'sbrhether2' (v05.09.2018) is up and running
                        </Typography>
                        <Typography variant="subheading" style={{"textAlign": "center", "paddingBottom": "1rem"}}>
                            Ссылки меню активны
                        </Typography>
                    </React.Fragment>
                </Paper>

            </React.Fragment>

        );
    }
}

export default HomePage;