var url = "https://data.calgary.ca/resource/c2es-76ed.geojson";
function retrieve_url (url){
  var url_req = new XMLHttpRequest();
  url_req.open("GET",url,false);
  url_req.send(null);
  return url_req.responseText;
}

var mymap = L.map('mapid').setView([51.0468, -114.0500], 13);
var geojsonLayer = L.geoJSON().addTo(mymap);
var starting
var ending
var layer01 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);

jQuery (function () {

jQuery('input[name = "dates"]').daterangepicker({
  opens: 'left'
}, function(start, end, label){
  console.log("A date has been entered" + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  starting = start.format('YYYY-MM-DD')
  ending = end.format('YYYY-MM-DD')

  var parameters = "?$where=issueddate > " + "'" + starting + "'" + " and issueddate < " + "'" + ending + "'";

  console.log(parameters);

  var geojson_endpoint = "https://data.calgary.ca/resource/c2es-76ed.geojson" + parameters;
  var geojson_object = JSON.parse(get_data_from_url(geoson_endpoint));
  console.log(geojson_endpoint);
  console.log(geojson_object);

  markers.clearLayers();

  geojsonLayer = L.geoJson(geojson_object, {
    onEachFeature: function(feature,layer){
      layer.bindPopup("<p>Issued Date: <p>" + feature.properties.issueddate + "<br>" + "<p>Community Name: <p>" + feature.properties.communityname + "<br>" + "<p>Work Class Group: <p>" + feature.properties.workclassgroup + "<p>Contractor Name: <p>" + feature.properties.contractorname + "<br>" + "<p>Original Address: <p>" + feature.properties.originaladdress).openPopup;

    }
  });

markers.addLayer(geojsonLayer);
featureGroup.addLayer(markers);
featureGroup.addTo(mymap);

});
});

function clear_layers(){
  mymap.removeLayer(geojsonLayer);
};

$(function() {
  $('input[name="single_date"]').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'),10)
  }, function(start, end, label){
    start_day = start.format('YYYY-MM-DD')
    console.log("Single Date:", start_day);

    const params = new URLSearchParams({issuedate: start_day,});

    var parameters = "?" + params + "T00:00:00.000";

    console.log(params.toString());
    console.log(parameters);

    var geojson_endpoint = "https://data.calgary.ca/resource/c2es-76ed.geojson" + parameters;
    var geojson_object = JSON.parse(get_data_from_url(geoson_endpoint));
    console.log(geojson_endpoint);
    console.log(geojson_object);

    markers.clearLayers();

    geojsonLayer = L.geoJson(geojson_object, {onEachFeature: function(feature,layer){
      layer.bindPopup("<p>Issued Date: <p>" + feature.properties.issueddate + "<br>" + "<p>Community Name: <p>" + feature.properties.communityname + "<br>" + "<p>Work Class Group: <p>" + feature.properties.workclassgroup + "<p>Contractor Name: <p>" + feature.properties.contractorname + "<br>" + "<p>Original Address: <p>" + feature.properties.originaladdress).openPopup;
    }});
    markers.addLayer(geojsonLayer);
    featureGroup.addLayer(markers);
    featureGroup.addTo(mymap);
  });
});

function clear_markers(){markers.clearLayers();};
