import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './screens/home';
import Login from './screens/login';
import Register from './screens/register';
import { auth } from './firebase';
import { userLoggedIn, userLoggedOut } from './store/auth';
import UserServices from './screens/userServices';


const Router = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) dispatch(userLoggedIn(user));
            else dispatch(userLoggedOut());
        });
    });
    
    return ( 
        <Switch>
            <Route path = '/login' render = {(props) => <Login {...props}/>}/>
            <Route path = '/register' render = {(props) => <Register {...props}/>}/>
            <Route path = '/home' render = {(props) => <Home {...props}/>}/>
            <Route path = '/services' render = {(props) => <UserServices {...props}/>}/>            
            <Redirect from = '/' to = '/home'/>
        </Switch>     
);}
 
export default Router;