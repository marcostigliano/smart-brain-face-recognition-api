//DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

//CONTROLLERS
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//CONSTANTS
const PORT = process.env.PORT;
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'smart-brain'
  }
});
const app = express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

//API
app.get('/', (req, res) => {});

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfile(db));

app.put('/image', image.handleImage(db));

app.post('/imageURL', image.handleAPICall);

app.listen(PORT || 3000);