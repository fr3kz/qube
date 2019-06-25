import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { type } from 'os';

const isActive = (history,path) => {
    if(history.location.pathname === path) return {color:"#ff9900"}
    else return {color:"#ffffff"}
}

export const signout = (next) => {
    if(typeof window !== "undefined") localStorage.removeItem("jwt")
    next();
    return fetch("http://127.0.0.1:8080/signout", {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err));
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}

const Menu = ({history}) => (
    <div>
       <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
            <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
        </li>

        {!isAuthenticated() && (
           <>
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">Signin</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/signup")} to="/signup">Signup</Link>
                </li>
           </>
        )}

        {isAuthenticated() && (
            <>
                <li className="nav-item">
                      <a className="nav-link" style={isActive(history,"/signup")} onClick={() => signout(() => history.push('/'))} >SignOUT</a>
              </li>
              <li className="nav-item">
                   <Link className="nav-link" to={`/user/${isAuthenticated().user._id}`}>{`${isAuthenticated().user.name}'s profile`}</Link>
                </li>
                <li className="nav-item">
                      <Link to="/users">Users</Link>
              </li>
            </>
        )}
        </ul>
    </div>
);

export default withRouter
(Menu);

