// const url = require('url')
// const querystring = require('querystring')
//      const db = req.app.get('db')
module.exports = {
    register: async (req,res) => {
        console.log(req.body)
        const db = req.app.get('db')
        const { username, user_password } = req.body
        const newUser = await db.add_user({username, user_password})

        res.status(200).send(newUser)
    },
    login: async (req,res) => {
        const db = req.app.get('db')
        const { username, user_password } = req.body
        const user = await db.select_user({username, user_password})

        res.status(200).send(user)
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
        const post = await db.select_post()
    }
}