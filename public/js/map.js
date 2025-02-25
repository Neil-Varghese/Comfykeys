
mapboxgl.accessToken = mapToken;  //mapToken is defined in the show.ejs file

const map = new mapboxgl.Map({    //mapboxgl.Map is a constructor
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});




// Add zoom and rotation controls to the map.
const marker = new mapboxgl.Marker({color: "red"})  //mapboxgl.Marker is a constructor
    .setLngLat(listing.geometry.coordinates)   //Listing.geometery.coordinates
    .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`))   //setPopup is a method of Marker
    .addTo(map);    //addTo is a method of Marker