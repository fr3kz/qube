import React, { Component } from 'react'

export default class User extends Component {

    constructor(){
        super()
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8080/users', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                this.setState({users: data})
            }
        })
    }

    render() {
        return (
          <div className="container">
              <h2 className="mt-5 mb-5">Users</h2>
              <div className="card">
                  {this.state.users.map((user, i) => 
                      <div key={i}>
                          <p>{user.name}</p> 
                           </div>
                  )
                  }
              </div>
          </div>
        )
    }
}
