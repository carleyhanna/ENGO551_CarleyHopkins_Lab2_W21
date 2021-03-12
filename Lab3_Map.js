mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybGV5aGFubmEiLCJhIjoiY2ttMWtsMm1yMmJoODJ2bjZ5ZHY1Y3d4bSJ9.9epVgqwPpPDpr8SmoLBJvA';
var map = new mapboxgl.Map({
container: 'map',
style:'mapbox://styles/carleyhanna/ckm2kgbb90rzq17nsivqccx0e', // style URL
center: [-114.0500, 51.0468], // starting position [longitude, latitude]
zoom: 12 // starting zoom
});

mapbox.addTo(map); 
