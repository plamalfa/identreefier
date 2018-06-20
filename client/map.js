// console.log(url);
const urlPathArray = window.location.pathname.split("/");
console.log(urlPathArray);
const secondLevelLocation = urlPathArray[2];
console.log(secondLevelLocation);

fetch(
  "https://data.cityofnewyork.us/resource/nwxe-4ae8.json?zipcode=" +
    secondLevelLocation
)
  .then(response => {
    return response.json();
  })
  .then(treedata => {
    treedata.forEach(tree => {
      let species = tree.spc_common;
      let treeId = tree.tree_id;
      let health = tree.health;
      let address = tree.address;
      let neighborhood = tree.nta_name;
      let zip = tree.zipcode;
      let latinName = tree.spc_latin;
      let latLng = { lat: Number(tree.latitude), lng: Number(tree.longitude) };
      var contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">' +
        species +
        "</h1>" +
        '<div id="bodyContent">' +
        "<p><b>Tree ID:</b> " +
        treeId +
        "</p>" +
        "<p><b>Latin Name:</b> " +
        latinName +
        "</p>" +
        "<p><b>Condition:</b> " +
        health +
        "</p>" +
        "<p><b>Address:</b> " +
        address +
        "</p>" +
        "<p><b>Neighborhood:</b> " +
        neighborhood +
        "</p>" +
        "<p><b>Zipcode:</b> " +
        zip +
        "</p>" +
        '<form action="/trees/favorites" method= "POST">' +
        '<input type= "hidden" name= "treeApiId" value=' +
        treeId +
        ">" +
        "<button>Favorite This Tree</button>" +
        "</form>" +
        "</div>" +
        "</div>";
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      marker.addListener("click", function() {
        infowindow.open(map, marker);
      });
    });
  });

var map;

//hardcode lat-long of NYC

function initMap() {
  var NYC = { lat: 40.7128, lng: -74.006 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: NYC
  });
}

initMap();
