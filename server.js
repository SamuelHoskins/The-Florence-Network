const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const dataPath = path.join(__dirname, 'data', 'artists.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

function loadArtists() {
  return JSON.parse(fs.readFileSync(dataPath));
}

function saveArtists(artists) {
  fs.writeFileSync(dataPath, JSON.stringify(artists, null, 2));
}

app.get('/api/artists', (req, res) => {
  res.json(loadArtists());
});

app.get('/artists/:id', (req, res) => {
  const artists = loadArtists();
  const artist = artists.find(a => a.id === req.params.id);
  if (!artist) {
    return res.status(404).send('Artist not found');
  }
  res.render('artist', { artist });
});

app.get('/artists/:id/edit', (req, res) => {
  const artists = loadArtists();
  const artist = artists.find(a => a.id === req.params.id);
  if (!artist) {
    return res.status(404).send('Artist not found');
  }
  res.render('edit_artist', { artist });
});

app.post('/artists/:id', (req, res) => {
  const artists = loadArtists();
  const artist = artists.find(a => a.id === req.params.id);
  if (!artist) {
    return res.status(404).send('Artist not found');
  }
  artist.name = req.body.name;
  artist.studio = req.body.studio;
  artist.description = req.body.description;
  saveArtists(artists);
  res.redirect(`/artists/${artist.id}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
