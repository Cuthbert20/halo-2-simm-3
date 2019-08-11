const url = require('url')
const querystring = require('querystring')
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
        const userPost = req.query.userpost == 'true' ? true: false ;
        const search = req.query.search ? req.query.search :'';
        const userId = req.query.userid
        console.log({userPost, search, userId})
        if(userPost && search !== ''){
            // const db = req.app.get('db')
            console.log('1')
            const posts = await db.search_by_title(['%' + search + '%'])
            res.status(200).send(posts)
        }
        if(!userPost && search === ''){ // !search
            console.log('2')
            const posts = await db.search_title_not_user([userId])
            res.status(200).send(posts)
        }
        if(!userPost && search){
            console.log('3')
            const posts = await db.search_notuser_posts([userId, '%' + search + '%'])
            res.status(200).send(posts)
        }
        if(userPost && !search){
            console.log('4')
            const posts = await db.all_posts()
            res.status(200).send(posts)
        }
    }
}