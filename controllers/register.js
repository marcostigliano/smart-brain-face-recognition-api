const handleRegister = (db, bcrypt) => (req, res) => {
  const saltRounds = 10;
  const { name, email, password } = req.body;
  if(!(name && email && password )){
    return res.status(400).json('Form information are incorrect.');
  }
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.transaction(trx => {
      return trx
        .insert({ email, hash })
        .into('login')
        .then(() => {
          return trx
            .insert({ email, name, joined: new Date() })
            .into('users')
            .returning('*')
            .then(user => res.status(200).json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(() => res.status(400).json('An error has occurred during registration.'))
  });
};

module.exports = {
  handleRegister: handleRegister
}