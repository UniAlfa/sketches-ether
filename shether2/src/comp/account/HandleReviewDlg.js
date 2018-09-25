import React from "react";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import TextField from "@material-ui/core/TextField/TextField";

export class HandleReviewDlg extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {opened: this.props.opened ? this.props.opened : false, form: {balance: 500}, error:undefined, processing:false}
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDecision= this.handleDecision.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }

    componentWillReceiveProps (nextProps){
        this.setState (nextProps);
        this.setState({form: {balance: 500}})
    }

    handleDecision=(decision) => {
        if (this.props.handleDecision) {
            this.setState({processing:true});
            this.props.handleDecision(this.state.account, this.state.form.balance, decision)
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
            <div className="btn-pane">
                <Dialog
                    scroll={"body"}
                    fullWidth={true}
                    open={this.state.opened}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.props.account ? 'Проверка' : 'Начисление'}</DialogTitle>
                    { (this.props.account && this.props.account.active) ?
                            <DialogContent>
                                <DialogContentText>
                                    Подтвердить начисление?
                                    {/*<Button variant="outlined" href={this.props.account.active.url} target={'_blank'}>*/}
                                        {/*Просмотр картинки*/}
                                    {/*</Button>*/}
                                </DialogContentText>

                                <TextField
                                    margin="dense"
                                    id="address"
                                    label={this.state.error ? "Начисление - " + this.state.error : "Начисление"}
                                    error={this.state.error ? true : undefined}
                                    onChange={this.handleChange('balance')}
                                    type="number"
                                    fullWidth
                                    value={this.state.form.balance}
                                />


                                <a href={this.props.account.active.url} target={'_blank'}>
                                    <div style={ {justifyContent: 'center', display:'flex'}}>
                                        <img src={this.props.account.active.url}  style={{minHeight: '150px', maxHeight: '300px'}}/>
                                    </div>
                                </a>
                            </DialogContent>
                        :                             <DialogContent>
                            <DialogContentText>
                                Начислить
                            </DialogContentText>

                            <TextField
                                margin="dense"
                                id="address"
                                label={this.state.error ? "Начисление - " + this.state.error : "Начисление"}
                                error={this.state.error ? true : undefined}
                                onChange={this.handleChange('balance')}
                                type="number"
                                fullWidth
                                value={this.state.form.balance}
                            />
                        </DialogContent>

                    }
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
                        <Button onClick={()=> {this.handleDecision('approve');}} color="primary"  disabled={this.state.processing}>
                            Начислить
                        </Button>
                        <Button onClick={()=> {this.handleDecision('decline');}} color="primary"  disabled={this.state.processing}>
                            Отклонить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
