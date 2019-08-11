import React, { Component } from 'react'

export default class Dashboard extends Component {
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
    render() {
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
