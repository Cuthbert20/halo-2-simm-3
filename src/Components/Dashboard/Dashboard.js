import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class Dashboard extends Component {
    state ={
        searchPost: '',
        checked: false,
        posts: []
    }
    handleChange(e, key){
        this.setState({
            [key]: e.target.value
        })
    }
    getPosts = () => {
        const { searchPost, checked } = this.state
        const { user_id } = this.props
        parseInt(user_id,10)
        axios.get(`/api/posts?userposts=${checked}&search=${searchPost}&userid=${user_id}`)
        .then(res => {
            console.log("hit", res.data)
            this.setState({
                posts: res.data
            })
        })
    }
    componentDidMount(){
        const { searchPost, checked } = this.state
        const { user_id } = this.props
        parseInt(user_id,10)
        axios.get(`/api/posts?userposts=${checked}&search=${searchPost}&userid=${user_id}`)
        .then(res => {
            console.log("hit", res.data)
            this.setState({
                posts: res.data
            })
        })
    }
    search = () => {
        const { searchPost, checked } = this.state
        const { user_id } = this.props
        axios.get(`/api/posts?userposts=${checked}&search=${searchPost}&userid=${user_id}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                posts: res.data
            })
        })
    }
    reset = () => {
        const { searchPost, checked } = this.state
        const { user_id } = this.props
        parseInt(user_id,10)
        axios.get(`/api/posts?userposts=${checked}&userid=${user_id}`)
        .then(res => {
            console.log("hit", res.data)
            this.setState({
                posts: res.data

            })
        })
    }
    handleCheckboxChange = event => {
        this.setState({
            checked: event.target.checked
        })
        // console.log(this.state.checked)
    }
    //axios.get(`http://localhost:4000/api/posts?userpost=${this.state.checked}&search=${this.state.search}&userid=${userId}`)
    handleClick = () => {
        this.props.history.push('/new')
    }
    render() {
        const { posts } = this.state
        console.log("State", this.state)
        console.log(this.props.user_id)
        const allPosts = posts.map(val => {
            return (
                <div key={val.post_id} >
                    <h3>{val.post_title}</h3>
                    <h5>{val.post_content}</h5>
                    <img src={val.post_image} alt=""/>
                </div>
            )
        })
        return (
            <div>
                Dashbord
               

                {/* this is A one line return */}
                {/* {this.state.posts.map(element=> <div>{element.post_title}</div>)} */}

                {/* this is a implicit return (not explicitly saying the word return) by wrapping inside a parenthesis */}
                {/* {this.state.posts.map(element=> (
                    <React.Fragment>
                    <div></div>
                    <div>{element.post_title}</div>
                    </React.Fragment>
                ))} */}

                <input onChange={e => this.handleChange(e, 'searchPost')} value={this.state.searchPost} type="text"/>
                <button onClick={this.search} >Search</button>
                <button onClick={this.reset} >Reset</button>
                <input onChange={this.handleCheckboxChange} value={this.state.checked} type="checkbox"/> My Posts <br/>
                <br/>
                <button onClick={this.handleClick} >Form</button>
                {allPosts}
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
