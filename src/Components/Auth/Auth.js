import React, { Component } from 'react'

export default class Auth extends Component {
    state = {
        username: '',
        user_password: ''
    }
    handleChange(elm, key){
        this.setState({
            [key]: elm.target.value
        })
    }
    render() {
        console.log(this.state)
        const { username, user_password } = this.state
        return (
            <div>
                <input placeholder="username" onChange={e => this.handleChange(e, "username")} value={username} type="text"/>
                <input placeholder='password' onChange={e => this.handleChange(e, "user_password")} value={user_password} type="password"/>
                <button>Login</button>
                <button>Register</button>
            </div>
        )
    }
}
