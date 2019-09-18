const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password} = req.body;
  if(!(email && password )){
    return res.status(400).json('Wrong credentials.');
  }
  db
    .select('email', 'hash')
    .from('login')
    .where({email})
    .then(data => {
      bcrypt.compare(password, data[0].hash, (err, check) => {
        if(check){
          return db.select('*').from('users').where({ email })
            .then(user => res.status(200).json(user[0]))
            .catch(() => res.status(400).json('An error has occurred during sign in.'))
        }
      })
    })
    .catch(() => res.status(400).json('Wrong credentials.'));
};

module.exports = {
  handleSignin: handleSignin
}