const express = require('express');
const app = express();

const PORT = 8888;

app.get('/', (req, res) => {
  const data = {
    name: 'Kris',
    isAwesome: true
  }
  res.json(data);
});

app.get('/awesome-generator', (req, res) => {
  console.log(req.query);
  const { name, isAwesome } = req.query;
  res.send(`${name} is ${JSON.parse(isAwesome) ? 'really' : 'not'} awesome`);
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});