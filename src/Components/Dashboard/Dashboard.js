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
    render() {
        console.log("State", this.state)
        console.log(this.props.user_id)
        return (
            <div>
                Dashbord
                {this.state.posts.map(elm => {
                    // console.log(elm)
                    return (
                        <div key={elm.post_id} >
                            {elm.post_title}
                        </div>
                    )
                })}

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
