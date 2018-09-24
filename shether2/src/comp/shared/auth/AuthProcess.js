//import React from "react";
import {shconfig} from '../../../config'


export default class AuthProcess {
    constructor() {
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
    }

    login(userName, password) {
        return this.fetch(shconfig.data_rest_api_authorize, {
            method: 'POST',
            body: JSON.stringify({
                userName,
                password
            })
        }).then(res => {
            this.setToken(userName, res.headers.get('Authorization'))
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        const token = this.getToken();
        return !!token;
    }

    setToken(userName, idToken) {
        localStorage.setItem('atoken', idToken);
        if (idToken) {
            localStorage.setItem('aname', userName);
        }
    }

    getToken() {
        return localStorage.getItem('atoken')
    }

    getUser() {
        return localStorage.getItem('aname')
    }

    logout() {
        localStorage.removeItem('atoken');
        localStorage.removeItem('aname');
    }

    cani(act, account){
        const tokenhere = this.loggedIn();

        switch (act) {
            case 'login':
                return !tokenhere;
            case 'logout':
                return tokenhere;
            case 'manage':
                return tokenhere;
            case 'approve':
                return tokenhere && account && account.active && account.active.url;
            default:
                return false;
        }

    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        };

        if (this.loggedIn() && this.getToken()) {
            headers['Authorization'] = this.getToken()
        }

        return fetch(url,
            {
                headers,
                ...options
            })
            .then( (response) => this._checkStatus (response))
    }

    _checkStatus(response) {
        if (response.ok) {
            return response;
        } else {
            let error = new Error(response.statusText);
            throw error;
        }
    }
}