const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '6b11a0cae5e142ba880cf054fe33fbea'
 });

 const handleAPICall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.status(200).json(data))
    .catch(() => res.status(400).json('An error has occurred during API call.'));
 }

const handleImage = (db) => (req, res) => {
  const {id} = req.body;
  db('users')
    .increment('entries', 1)
    .where({id})
    .returning('entries')
    .then(entries => res.status(200).json(entries[0]))
    .catch(() => res.status(400).json('An error has occurred during image detection'));
};

module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall
}