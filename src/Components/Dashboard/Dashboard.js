import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class Dashboard extends Component {
    state ={
        searchPost: '',
        checked: true,
        posts: []
    }
    handleChange(e, key){
        this.setState({
            [key]: e.target.value
        })
    }
    getPosts = () => {
        const { searchPost, checked, posts } = this.state
        const { user_id } = this.props
        axios.get(`/api/posts?userposts=${checked}&search=${searchPost}&userid=${user_id}`)
        .then(res => {
            console.log("hit", res.data)
            this.setState({
                posts: res.data
            })
        })
    }
    //axios.get(`http://localhost:4000/api/posts?userpost=${this.state.checked}&search=${this.state.search}&userid=${userId}`)
    render() {
        console.log(this.props.user_id)
        return (
            <div>
                Dashbord
                {this.state.posts.map(elm => {
                    console.log(elm)
                })}
                <input onChange={e => this.handleChange(e, 'searchPost')} value={this.state.searchPost} type="text"/>
                <button>Search</button>
                <button>Reset</button>
                <input value={this.state.checked} type="checkbox"/> My Posts <br/>
            </div>
        )
    }
}
function mapStateToProps(reduxState){
    console.log(reduxState.user_id)
    const { user_id } = reduxState
    return {user_id}
}

export default connect(mapStateToProps,{})(Dashboard)
