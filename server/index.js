const express = require('express')
const app = express()
require('dotenv').config()
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller.js')


app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))
//end points
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)

app.get('/api/posts', ctrl.allPosts)
app.get('/api/apost/:id', ctrl.aPost)

app.post('/api/newpost/:id', ctrl.newPost)
app.post('/api/auth/logout', ctrl.logout)
app.get('/api/auth/me', ctrl.displayUser)




massive(CONNECTION_STRING).then(db => {
    
    app.set('db', db)
    
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is now listening`))

}).catch(err => console.log(err, 'not connecting to db stu'))

