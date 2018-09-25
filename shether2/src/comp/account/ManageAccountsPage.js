import React from 'react';
import AccountList from "../shared/list/AccountList_S";
import {NewAccountDlg} from "./NewAccountDlg";
import {shconfig} from "../../config";
import * as ethers from "ethers";
import moment from "moment";
import Typography from "@material-ui/core/Typography/Typography";
import AuthProcess from "../shared/auth/AuthProcess";
import {HandleReviewDlg} from "./HandleReviewDlg";
import Button from "@material-ui/core/Button/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";


const Auth = new AuthProcess();

export class ManageAccountsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.createWallet = this.createWallet.bind(this);
        this.handleReview = this.handleReview.bind(this);
        this.handleDecision = this.handleDecision.bind(this);
        this.state = {lastUpdate: 1, managedAccount: undefined}
    }

    createWallet(newWallet): Promise {

        let _that = this;
        if (newWallet) {

            const provider = ethers.providers.getDefaultProvider();

            return new Promise(function (resolve, reject) {
                ethers.Wallet.fromBrainWallet(newWallet.username, newWallet.password).then(function(wallet) {

                    provider.getBalance(wallet.address).then(function(balance) {
                        //const etherString = ethers.utils.formatEther(balance);
                        const currtime = moment().format('YYYY-MM-DD HH:mm:ss');
                        const savedBalance = newWallet.balance;
                        const account = {
                            username: newWallet.username,
                            password: newWallet.password,
                            address: wallet.address,
                            created: currtime,
                            balance: savedBalance
                        };

                        Auth.fetch(shconfig.mongo_api_accounts_crud_url, {
                            method: 'POST',
                            crossDomain:true,
                            body: JSON.stringify( account )
                        })
                            .then(response => {
                                    if (response.ok) {
                                        _that.setState({lastUpdate: _that.state.lastUpdate ? _that.state.lastUpdate + 1 : 0});
                                        return resolve(true);
                                    } else {
                                        let error = new Error(response.statusText);
                                        throw error;
                                    }
                                }
                            )
                            .catch(reason => {
                                console.log(reason);
                                reject(reason);
                            });
                    });
                });

            });
        }
    };

    handleDecision(account, sum, decision): Promise {
        let _that = this;
        console.log(_that.state);
        if (account) {
            return new Promise(function (resolve, reject) {
                let aprdec = {username: account.username, decision: decision, sum: sum};

                Auth.fetch(shconfig.data_rest_api_approval, {
                    crossDomain:true,
                    method: 'POST',
                    body: JSON.stringify(aprdec)
                })
                    .then(response => {
                        _that.setState({lastUpdate: _that.state.lastUpdate ? _that.state.lastUpdate + 1 : 0});
                        return resolve(true);
                        }
                    )
                    .catch(reason => {
                        console.log(reason);
                        reject(reason);
                 });
            });
        }
    }

    handleReview(account) {
        if (account) {
            this.setState({managedAccount: account, opened: true});
        }
        else
            this.setState({managedAccount: undefined, opened: false});
    }

    render() {
        return (
            <div>
                <Typography variant="headline" align="center" style={{"paddingTop": "1rem"}}>
                    Страница администратора
                </Typography>

                <div><NewAccountDlg handleCreate={this.createWallet}/></div>
                <div><HandleReviewDlg account={this.state.managedAccount} opened={this.state.opened} handleDecision={this.handleDecision}/></div>

                <AccountList mode={'admin'} lastUpdate={this.state.lastUpdate} handleReview={this.handleReview}/>
            </div>
        );
    }
}

