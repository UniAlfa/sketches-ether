import React, { Component } from 'react';
import AuthProcess from './AuthProcess';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import LockIcon from '@material-ui/icons/LockOutlined';
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

export class Login extends Component {

    constructor(props, context) {
        super(props, context);
        const { classes } = props;

        this.state = {form: {username: '', password: ''}, error:undefined, processing:false};

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthProcess();
    }

    render() {

        return (
                    <React.Fragment>

                    <Paper style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'10px', paddingBottom:'10px'}}>
                        <Avatar >
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline">Sign in</Typography>
                        <form onSubmit={this.handleFormSubmit}>
                            <FormControl margin="normal" required fullWidth aria-describedby="login-error-text" error={this.state.error ? 'error' : undefined} >
                                <InputLabel htmlFor="username">User name</InputLabel>
                                <Input id="username" name="username" autoComplete="username" autoFocus onChange={this.handleChange}/>
                                <FormHelperText id="login-error-text">{this.state.error}</FormHelperText>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth error={this.state.error ? 'error' : undefined} aria-describedby="password-error-text">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleChange}
                                />
                                <FormHelperText id="password-error-text">{this.state.error}</FormHelperText>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                            >
                                Sign in
                            </Button>
                        </form>
                    </Paper>



                    {/*<form noValidate autoComplete="off" onSubmit={this.handleFormSubmit}>*/}
                        {/*<TextField*/}
                            {/*autoFocus*/}
                            {/*margin="dense"*/}
                            {/*required*/}
                            {/*id="username"*/}
                            {/*name="username"*/}
                            {/*label="User Name"*/}
                            {/*onChange={this.handleChange}*/}
                        {/*/>*/}
                        {/*<TextField*/}
                            {/*label="Password"*/}
                            {/*type="password"*/}
                            {/*id="password"*/}
                            {/*name="password"*/}
                            {/*autoComplete="current-password"*/}
                            {/*margin="dense"*/}
                            {/*onChange={this.handleChange}*/}
                        {/*/>*/}
                        {/*<Button type="submit" color="primary"  disabled={this.state.processing}>*/}
                            {/*Login*/}
                        {/*</Button>*/}
                    {/*</form>*/}

                    </React.Fragment>
        );
    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit(e){
        e.preventDefault();

        this.setState({processing: true});
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                this.setState({processing: false});
                this.props.history.replace('/');
            })
            .catch(err =>{
                console.log(err);
                this.setState({processing: false});
                this.setState({error: 'Login failed'});

            })
    }
};
