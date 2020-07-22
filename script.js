// Import stylesheets
//import './style.css';
//import dependencies
//const $ = require('jquery');
const d = new Date();
//console log
console.ownlog = function() {
  for (var o of arguments) console.log(o);console.log('')
}
//var
var datevalue, mnth, divid = 1;
// Write Javascript code!

/*fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.294388&lon=5.277333')
  .then(response => response.json())
  .then(data => {
  	// Do something with your data
  	console.ownlog(data);
});*/
$('document').ready(function() {
  (function () {
    //——\\
    //                    watchPosition()
    navigator.geolocation.getCurrentPosition(function (position) {
      //Coordinate
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      console.ownlog('Lat:', lat, 'Lon:', lon)
      //getJSON
      /*$.getJSON('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' + lat + '&lon=' + lon , function(data) {
        console.ownlog('Data:', data, '',
        'Data.geometry.coordinates:', data.geometry.coordinates, '',
        'Data.properties:', data.properties, '',
        'Data.properties.timeseries:', data.properties.timeseries);
      }).fail(function() {
        console.log(':(')
      })*/
      $.getJSON('https://api.opencagedata.com/geocode/v1/json?q=60.2975763+5.2758364&key=94d01d632a064c0ea8ad9ae4be4ee8a5', function(data) {
        console.ownlog('Test:', data);
      }).fail(function() {
              console.ownlog(':(')
      })
      $.ajax({
        url: 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' + lat + '&lon=' + lon,
        type: 'get',
        dataType: 'json',
        success: function(data) {
          console.ownlog('Data:', data, '',
          'Data.geometry.coordinates:', data.geometry.coordinates, '',
          'Data.properties.timeseries:', data.properties.timeseries, '',
          'Grader C°:', data.properties.timeseries[0].data.instant.details.air_temperature + 'C°');

          //——\\

          data.properties.timeseries.forEach((value, index) => {

            datevalue = new Date(value.time);
            mnth = datevalue.getMonth() + 1;
            //$('#app').append(value.time.replace('T', ' ').replace('Z', '') + ' : ' + value.data.instant.details.air_temperature + 'C°<br/>')
            $('#app').append('<div id="' + divid + '" class="box">Klokken <b>' + datevalue.getHours() + '</b> Den <b>' + datevalue.getDate() + '/' + mnth + '</b>:<br/></div><br/><br/>');
            $('#' + divid).append('<b>' + value.data.instant.details.air_temperature + ' C°</b><br/>');
            $('#' + divid).append('<img class="wthr-img" src="./wthr/' + value.data.next_1_hours.summary.symbol_code + '.svg">');
            if(d.getDate() == datevalue.getDate()) {
              $('#' + divid).append('<span class="idag">I dag</span>')
            }
            divid += 1;

          });
        },
        error: function() {
          console.log(':(')
          $('#app').append('Du må la nettsiden vite hvor du er :(')
        }
      });
    }
    )
  })();
});
