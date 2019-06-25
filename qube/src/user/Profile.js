import React, { Component } from 'react'
import { Redirect, Link} from 'react-router-dom';
// `${process.env.REACTAPPdedede}`
export default class Profile extends Component {

    constructor(){
        super();

        this.state = {
            user:"",
            redirectToSignin: false
        }
    }   

    isAuthenticated = () => {
        if(typeof window == "undefined") return false
        if(localStorage.getItem("jwt")){
            return JSON.parse(localStorage.getItem("jwt"));
        }else{
            return false
        }
    }

    componentDidMount(){
       const userId = this.props.match.params.userId

       fetch(`http://127.0.0.1:8080/users/${userId}`,{
           method: "GET",
           headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: `Bearer ${this.isAuthenticated().token}`
           }

       }).then(response => {
            return response.json()
       }).then(data => {
            if(data.error){
                this.setState({ redirectToSignin: true});
            }else{
                this.setState({user:data});
            }
       });
    }

    render() {
        const redirectToSignin = this.state.redirectToSignin;
        if (redirectToSignin) return <Redirect to="/signin"/>
        return (
            <div className="container">
                <div className="col-md-6">
                    <h2 className="">hello {this.isAuthenticated().user.name}</h2>
                    <p>{ `joined ${new Date(this.state.user.created).toDateString()}` }</p>
                </div>
            
                <div className="col-md-6">
                    edit delete
                    {this.isAuthenticated().user && this.isAuthenticated().user._id == this.state.user._id && (
                        <div className="d-inline-block mt5">
                            <Link to={`/users/edit/${this.state.user._id}`}>Edit Profile</Link>
                            <Link to={`/users/delete/${this.state.user._id}`}>Edit Profile</Link>
                        </div>
                    )}
                    </div>
            </div>
        )
    }
}
