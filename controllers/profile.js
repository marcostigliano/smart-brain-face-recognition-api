const handleProfile = (db) => (req, res) => {
  const {id} = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if(user.length){
        res.status(200).json(user[0]);
      } else {
        res.status(404).json('Profile not found.');
      }
    })
};

module.exports = {
  handleProfile: handleProfile
}