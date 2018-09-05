import React from 'react';
import { Switch, Route } from 'react-router-dom'
import HomePage from '../home/Home';
import {AccountListPage} from '../account/AccountListPage';
import {ManageAccountsPage} from '../account/ManageAccountsPage';

import {page404} from "../shared/err/page404";

export const MainRoutes =() => (
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/accounts" component={AccountListPage}/>
            <Route exact path="/admin" component={ManageAccountsPage}/>
            <Route path="*" component={page404} />
        </Switch>
);
