// const url = require('url')
// const querystring = require('querystring')
//      const db = req.app.get('db')
module.exports = {
    register: async (req,res) => {
        // console.log(req.body)
        const db = req.app.get('db')
        const { username, user_password } = req.body
        const newUser = await db.add_user({username, user_password})
        // console.log(newUser[0])
        const user = newUser[0]
        req.session.user = {
            user_id: user.user_id,
            username: user.username,
            user_image: user.user_image
        }
        console.log("session", req.session.user)
        res.status(200).send(req.session.user)
    },
    login: async (req,res) => {
        const db = req.app.get('db')
        const { username, user_password } = req.body
        const user = await db.select_user({username, user_password})
        // console.log('user', user)
        const loggedUser = user[0]
        req.session.user = {
            user_id: loggedUser.user_id,
            username: loggedUser.username,
            user_image: loggedUser.user_image
        }
        console.log('session login', req.session)
        res.status(200).send(req.session.user)
    },
    allPosts: async (req,res) => {
        const db = req.app.get('db')
        // console.log(db.client.query)
        // const { id } = req.params
        // const post = await db.select_post([id])
        const userPost = req.query.userposts === 'true' ? true: false ;
        const search = req.query.search ? req.query.search :'';
        let userId = req.query.userid
        userId = +userId
        console.log({userPost, search, userId})
        if(userPost && search !== ''){
            // const db = req.app.get('db')
            console.log('1')
            const posts = await db.search_by_title(['%' + search + '%'])
            res.status(200).send(posts)
        }
        else if(!userPost && search === ''){ // !search
            console.log('2')
            const posts = await db.search_title_not_user([userId])
            res.status(200).send(posts)
        }
        else if(!userPost && search){
            console.log('3')
            const posts = await db.search_notuser_posts([userId, '%' + search + '%'])
            res.status(200).send(posts)
        }
        else if(userPost && !search){
            console.log('4')
            const posts = await db.all_posts()
            res.status(200).send(posts)
        }
        else if(!userPost && !search){
            console.log('5')
            const posts = await db.all_posts()
            res.status(200).send(posts)
        }
    },
    aPost: async (req,res) => {
        const db = req.app.get('db')
        const { id } = req.params
        const post = await db.select_post([id])
        res.status(200).send(post)
    },
    newPost: async (req,res) => {
        const db = req.app.get('db')
        const { id } = req.params
        const { post_title, post_image, post_content } = req.body
        const result = await db.new_post({id, post_title, post_image, post_content})
        res.status(200).send(result)
    },
    logout: async (req,res) => {
        console.log('User Logged Out')
        //destory is a method that lives on session and it enables you to destory the users session profile
        req.session.destroy()

        res.status(200).send({message: 'logged out'})
    },
    displayUser: async (req,res) => {
        console.log('hit display user')
        const db = req.app.get('db')
        const { user_id } = req.session.user
        console.log("session", req.session.user)
        const loggedUser = await db.select_loggedin_user([user_id])
        console.log("user_id", user_id)
        console.log("loggedUser", loggedUser)
        res.status(200).send(loggedUser)
    }
}