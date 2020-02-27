const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'admin',
    database: 'smartbrain'
  }
})

const saltRounds = 10

const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  db.select('*')
    .from('users')
    .then(users => {
      res.send(users)
    })
})

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt, saltRounds)
})

app.post('/register', (req, res) =>
  register.handleRegister(db, bcrypt, saltRounds)(req, res)
)

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db)
})

app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
})

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
})
