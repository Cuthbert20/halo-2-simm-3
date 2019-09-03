import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { updateUser } from '../../ducks/reducer'
import axios  from 'axios'

class Nav extends Component {
    state ={
        user: []
    }
    componentDidMount() {
        this.loggedUser()
    }
    loggedUser = () => {
        axios.get('/api/auth/me')
        .then(res => {
            this.setState({
                user: res.data
            })
        })
    }
    logout = async () => {
        let res = await axios.post('/api/auth/logout')
        // console.log(res)
        // console.log(this.props)
        this.props.history.push('/')
    }
    render() {
        // console.log(this.props)
        return (
            <div>
                Nav
                <div>
                    {this.props.username}
                </div>
                <div className='user-image' >
                  <img src={this.props.user_image} alt="Cool img"/>  
                </div>
                <Link to='/dashboard' ><button>Home</button></Link>
                <Link to='post/:postid' ><button>New Post</button></Link>
                <button onClick={this.logout} >Logout</button>
            </div>
        )
    }
}
function mapStateToProps(reduxState){
    // console.log(reduxState)
    const { username, user_image } = reduxState
    return { username, user_image}
}

export default connect(mapStateToProps,{updateUser})(Nav)
