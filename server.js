const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const db = {
  users: [
    {
      id: '1',
      name: 'Marco',
      email: 'marco@test.it',
      password: 'crunch',
      entries: 0,
      joined: new Date()
    },
    {
      id: '2',
      name: 'Davide',
      email: 'davide@test.it',
      password: 'illustration',
      entries: 0,
      joined: new Date()
    }
  ],
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send(db.users);
});

app.post('/signin', (req, res) => {
  if( req.body.email === db.users[0].email &&
      req.body.password === db.users[0].password) {
    res.status(200).json(db.users[0]);;
  } else {
    res.status(400).json('Login Failed');
  }
});

app.post('/register', (req, res) => {
  const { name, email } = req.body;
  db.users.push({
      id: '3',
      name: name,
      email: email,
      entries: 0,
      joined: new Date()
  });
  res.status(200).json(db.users[db.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  let found = false;
  db.users.forEach(user => {
    if(user.id === id){
      found = true;
      return res.status(200).json(user);
    }
  });
  if(!found){
    res.status(404).json('No User Found');
  }  
});

app.put('/image', (req, res) => {
  const {id} = req.body;
  let found = false;
  db.users.forEach(user => {
    if(user.id === id){
      found = true;
      user.entries++;
      return res.status(200).json(user.entries);
    }
  });
  if(!found){
    res.status(404).json('No User Found');
  }  
});

app.listen(3001, () => {
  console.log('OK');
});