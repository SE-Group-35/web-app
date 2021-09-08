import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Home from './screens/home';
import Login from './screens/login';
import Register from './screens/register';
import { auth } from './firebase';


const Router = () => {
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) history.push('/');
            else history.push('/login');
        });
    });
    
    return ( 
        <Switch>
            <Route path = '/login' render = {(props) => <Login {...props}/>}/>
            <Route path = '/register' render = {(props) => <Register {...props}/>}/>
            <Route path = '/home' render = {(props) => <Home {...props}/>}/>
            <Redirect from = '/' to = '/home'/>
        </Switch>     
);}
 
export default Router;