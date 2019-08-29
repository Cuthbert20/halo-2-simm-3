import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Form extends Component{
    state = {
        post_title: '',
        post_image: '',
        post_content: ''
    }
    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }
    newPost = () => {
        const { post_title, post_image, post_content } = this.state
        const { user_id } = this.props
        // const id = this.props.user_id
        axios.post(`/api/newpost/${user_id}`, {post_title, post_image, post_content})
        this.props.history.push('/dashboard')
    }
    render(){
        const { post_title, post_image, post_content } = this.state
        console.log("props", this.props)
        console.log( "state", this.state)
        return(
            <div>
                <input onChange={e => this.handleChange(e, 'post_title')} value={post_title} placeholder="title" type="text"/>
                <input onChange={e => this.handleChange(e, 'post_image')} value={post_image} placeholder="image" type="text"/>
                <input onChange={e => this.handleChange(e, 'post_content')} value={post_content} placeholder="content" type="text"/>
                <button onClick={this.newPost} >Post</button>
            </div>
        )
    }
}
function mapStateToProps(reduxState){
    const {user_id} = reduxState
    return{
        user_id
    }
}


export default connect(mapStateToProps,{})(Form)