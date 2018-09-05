import React, { Component } from 'react';
import './App.css';
import Header from '../src/comp/shared/Header';
import {MainRoutes} from './comp/routes/MainRoutes'
import './styles/styles.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <MainRoutes/>
            </div>
        );
    }
}

export default App;
