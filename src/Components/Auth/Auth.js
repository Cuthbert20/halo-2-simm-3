import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {displayUser} from '../../ducks/reducer'

class Auth extends Component {
    state = {
        username: '',
        user_password: ''
    }
    // componentWillMount(){
    //     this.setState({
    //         username: '',
    //         user_password: ''
    //     })
    // }
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
    login = () => {
        const { username, user_password } = this.state
        axios.post('/auth/login', {username, user_password})
        .then(res => {
            this.props.displayUser(username)
            console.log(res.data[0])
            this.setState({
                username: res.data[0].username,
                user_password: res.data[0].username
            })
        })
    }
    render() {
        // console.log(this.state)
        const { username, user_password } = this.state
        return (
            <div>
                <input placeholder="username" onChange={e => this.handleChange(e, "username")} value={username} type="text"/>
                <input placeholder='password' onChange={e => this.handleChange(e, "user_password")} value={user_password} type="password"/>
                <Link to='/dashboard' ><button onClick={this.login} >Login</button></Link>
                <Link to='/dashboard' ><button onClick={this.register}>Register</button></Link>
            </div>
        )
    }
}

export default connect(null,{displayUser})(Auth)
