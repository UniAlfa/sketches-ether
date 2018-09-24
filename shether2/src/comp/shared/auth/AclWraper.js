import React, { Component } from 'react';
import AuthProcess from './AuthProcess';

export default function withAcl(AuthComponent) {
    const Auth = new AuthProcess();

    return class AclWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }

        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login')
            }
            else {
                try {
                    const _user = Auth.getUser()
                    this.setState({
                        user: _user
                    })
                }
                catch(err){
                    Auth.logout();
                    this.props.history.replace('/login')
                }
            }
        }

        render(){
            if (this.state.user) {
                return (
                    <AuthComponent {...this.props} user={this.state.user} />
                )
            }
            else {
                return <div>Доступ заперщен</div>
            }
        }

    }
}


