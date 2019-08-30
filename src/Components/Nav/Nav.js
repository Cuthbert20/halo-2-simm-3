import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { updateUser } from '../../ducks/reducer'
import { axios } from 'axios'

class Nav extends Component {
    loggedUser = () => {
        axios.get('/api/auth/me')
        .then(res => {
            console.log(res.data)
        })
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
                <Link to='/' ><button>Logout</button></Link>
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
