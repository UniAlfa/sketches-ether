import React from 'react';
import { Switch, Route } from 'react-router-dom'
import withAcl from '../shared/auth/AclWraper';
import HomePage from '../home/Home';
import {AccountListPage} from '../account/AccountListPage';
import {ManageAccountsPage} from '../account/ManageAccountsPage';
import {Login} from '../shared/auth/Login_S';

import {page404} from '../shared/err/page404';


export const MainRoutes =() => (
    <React.Fragment>
        <Switch>

            <Route exact path="/" component={HomePage}/>
            <Route exact path="/accounts" component={AccountListPage}/>
            <Route exact path="/admin" component={withAcl(ManageAccountsPage)}/>
            <Route exact path="/login" component={Login}/>
            <Route path="*" component={page404} />


        </Switch>
    </React.Fragment>
);
