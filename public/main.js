const map = L.map('map').setView([43.7696, 11.2558], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch('/api/artists')
  .then(res => res.json())
  .then(artists => {
    artists.forEach(artist => {
      const marker = L.marker([artist.lat, artist.lng]).addTo(map);
      marker.bindPopup(`<a href="/artists/${artist.id}">${artist.name}</a>`);
    });
  })
  .catch(err => console.error('Failed to load artists', err));
