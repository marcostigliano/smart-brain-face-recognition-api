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
const DATABASE_URL = process.env.DATABASE_URL;
const db = knex({
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL,
    ssl: true
  }
});
const app = express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

//API
app.get('/', (req, res) => {res.status(200).json('OK')});

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfile(db));

app.put('/image', image.handleImage(db));

app.post('/imageURL', image.handleAPICall);

app.listen(PORT || 3000);