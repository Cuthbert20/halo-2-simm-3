import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
    register = () => {
        const { username, user_password } = this.state
        axios.post('/auth/register', {username, user_password})
        .then(res => {
            console.log(res.data[0])
            // this.setState({
            //     username: '',
            //     user_password: ''
            // })
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
                <Link to='/dashboard' ><button onClick={this.register}>Register</button></Link>
            </div>
        )
    }
}
