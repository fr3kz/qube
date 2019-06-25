import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import User from './user/User';

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <Route exact path="/user/:userId" component={Profile}></Route>
            <Route exact path="/users" component={User}></Route>
        </Switch>
    </div>
)
export default MainRouter;