const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(['/assets', '/public/assets'], express.static(`${__dirname}/../build/assets/`));

app.set('view engine', 'ejs');

/**
 * Serve the entire UI application.
 */
app.get('*', (req, res) => {
  console.log(__dirname);
  res.render(`${__dirname}/../build/assets/index.ejs`, {});
});

const PORT = process.env.PORT;

app.listen(PORT || 4001, () => {
  console.log(`server is listening at ${PORT || 4001}`)
});
