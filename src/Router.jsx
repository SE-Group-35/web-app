import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './screens/home';
import Login from './screens/login';
import Register from './screens/register';

const Router = () => {
    
    return ( 
        <Switch>
            <Route path = '/login' render = {(props) => <Login {...props}/>}/>
            <Route path = '/register' render = {(props) => <Register {...props}/>}/>
            <Route path = '/home' render = {(props) => <Home {...props}/>}/>
            <Redirect from = '/' to = '/home'/>
        </Switch>     
);}
 
export default Router;