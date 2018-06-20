const db = require("../db/connection");

const Tree = {};

Tree.getReponseAsJSON = url => {
  return fetch(url).then(response => response.json());
};

Tree.initMap = () => {
  var NYC = { lat: 40.7128, lng: -74.006 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: NYC
  });
  // var marker = new google.maps.Marker({
  //   position: NYC,
  //   map: map
  // });
};

module.exports = Tree;
