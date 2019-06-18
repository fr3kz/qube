import React, { Component } from 'react'

class signup extends Component {

    constructor(){
        super()

        this.state = {
            name:"",
            email:"",
            password:"",
            error:"",
            open: false
        }

    }

    handleChange = name => event => {
        this.setState({error:""});
        this.setState({ [name]: event.target.value });
    }

    clickSubmit = event =>{
        event.preventDefault();

        const {name,email,password} = this.state
        const user = {
            name:name,
            email:email,
            password:password,
        }

       this.signup(user).then(data => {

           if(data.error){
                this.setState({error: data.error})
            }
            else this.setState({
                name:"",
                email:"",
                password:"",
                error:"",
                open: true
            })

       });
    }

    signup = user =>{
        return fetch("http://127.0.0.1:8080/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => {
            return response.json()
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Gingup</h2>

                <div className="alert alert-danger" style={{ display: this.state.error ? "" : "none" }} >
                    {this.state.error}
                </div>    

                <div className="alert alert-info" style={{ display: this.state.open ? "" : "none" }} >
                New Account is successfully created. Please Sign In.
                </div>    

                <form>

                    <div className="form-group">
                        <lablel className="text-muted">Name</lablel>
                        <input onChange={this.handleChange("name")} type="text" className="form-control" value={this.state.name} />
                    </div>

                    <div className="form-group">
                        <lablel className="text-muted">Email</lablel>
                        <input onChange={this.handleChange("email")} type="text" className="form-control"  value={this.state.email} />
                    </div>

                    <div className="form-group">
                        <lablel className="text-muted">Password</lablel>
                        <input onChange={this.handleChange("password")} type="password" className="form-control"  value={this.state.password} />
                    </div>

                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
export default signup;