import React from 'react';
import Dialog from "@material-ui/core/Dialog/Dialog";
import Button from "@material-ui/core/Button/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import TextField from "@material-ui/core/TextField/TextField";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import LinearProgress from '@material-ui/core/LinearProgress';
import AddIcon from '@material-ui/icons/Add';


export class NewAccountDlg extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {opened: false, form: {username: '', password: '', balance: ''}, error:undefined, processing:false}
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCreate= this.handleCreate.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }

    handleCreate= () => {
        if (this.props.handleCreate) {
            this.setState({processing:true});
            this.props.handleCreate(this.state.form)
                .then(ret => {this.setState({error: undefined, processing:false}); this.handleClose();})
                .catch(reason => {
                    console.log('Произошла ошибка [' + reason.message + ']');
                    this.setState({error: 'Произошла ошибка [' + reason.message + ']', processing:false});
                });
        }
    };

    handleOpen = () => {
        this.setState({ opened: true });
    };

    handleClose = () => {
        this.setState({ opened: false });
    };

    handleChange = name => event => {
        let _form = { ...this.state.form, ...{ [name]: event.target.value }};

        this.setState({ form: _form });
    };

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleOpen}>
                    <AddIcon />
                    Создать кошелек
                </Button>

                <Dialog
                    open={this.state.opened}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Добавить запись</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ввод параметров кошелька
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label={this.state.error ? "Номер телефона - " + this.state.error : "Номер телефона"}
                            error={this.state.error ? true : undefined}
                            onChange={this.handleChange('username')}
                            fullWidth
                            value={this.state.form.username}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label={this.state.error ? "Пароль - " + this.state.error : "Пароль"}
                            error={this.state.error ? true : undefined}
                            fullWidth
                            onChange={this.handleChange('password')}
                            type="password"
                            value={this.state.form.password}
                        />
                        <TextField
                            margin="dense"
                            id="address"
                            label={this.state.error ? "Баланс - " + this.state.error : "Баланс"}
                            error={this.state.error ? true : undefined}
                            onChange={this.handleChange('balance')}
                            type="number"
                            fullWidth
                            value={this.state.form.balance}
                        />
                    </DialogContent>
                    {this.state.processing
                        ?
                        <div style={{flexGrow: 1}}>
                            <LinearProgress />
                        </div>
                        : undefined
                    }

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" disabled={this.state.processing}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreate} color="primary"  disabled={this.state.processing}>
                            Создать
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
