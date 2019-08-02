var apiKey = "pk.eyJ1IjoidGVycmFuY2U4OSIsImEiOiJjanl1ZmxycGYwZWplM29vem5lcXhodHkxIn0.EUbdI1xw6BeHoaxCl19P8A";

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: apiKey
});

var map = L.map("mapid", {
  center: [
    40.7, -94.5
  ],
  zoom: 3
});

graymap.addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson", function(data) {

  function styleInfo(feature) {
    return {
      opacity: 1,
      color: getColor(feature.properties.mag),
      radius: feature.properties.mag,
      stroke: true,
      weight: 0.5
    };
  }

  function getColor(magnitude) {
    if (magnitude < 2)
    {
      return "#5cb85c";
    }
    else
    {
      if (magnitude < 4)
      {
        return "#dbf84a";
      }
      else
      {
        return "#ff000f";
      }
    }
  }

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(map);

});
