// Import stylesheets
//import './style.css';
//import dependencies
//const $ = require('jquery');
const d = new Date();
//console log
console.ownlog = function() {
  for (var o of arguments) console.log(o);console.log('');
};
//var
var datevalue, mnth, divid = 1, symbol;
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
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.ownlog('Lat:', lat, 'Lon:', lon);
      //getJSON
      /*$.getJSON('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' + lat + '&lon=' + lon , function(data) {
        console.ownlog('Data:', data, '',
        'Data.geometry.coordinates:', data.geometry.coordinates, '',
        'Data.properties:', data.properties, '',
        'Data.properties.timeseries:', data.properties.timeseries);
      }).fail(function() {
        console.log(':(')
      })*/
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
            symbol = value.data.next_1_hours.summary.symbol_code;
            if(symbol != null && symbol != undefined && symbol != ' ' && symbol != '' && symbol != 0) {
              datevalue = new Date(value.time);
              mnth = datevalue.getMonth() + 1;
              //$('#app').append(value.time.replace('T', ' ').replace('Z', '') + ' : ' + value.data.instant.details.air_temperature + 'C°<br/>')
              $('#app').append('<div id="' + divid + '" class="box">Klokken <b>' + datevalue.getHours() + '</b> Den <b>' + datevalue.getDate() + '/' + mnth + '</b>:<br/></div><br/><br/>');
              $('#' + divid).append('<b>' + value.data.instant.details.air_temperature + ' C°</b><br/>');
              $('#' + divid).append('<img class="wthr-img" src="./wthr/' + symbol + '.svg">');
              if(d.getDate() == datevalue.getDate()) {
                $('#' + divid).append('<span class="idag">I dag</span>');
              }
              else if(d.getDate() + 1 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">I morgen</span>');
              }
              else if(d.getDate() + 2 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">I overmorgen</span>');
              }
              else if(d.getDate() + 3 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 3 dager</span>');
              }
              else if(d.getDate() + 4 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 4 dager</span>');
              }
              else if(d.getDate() + 5 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 5 dager</span>');
              }
              else if(d.getDate() + 6 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 6 dager</span>');
              }
              else if(d.getDate() + 7 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 7 dager</span>');
              }
              else if(d.getDate() + 8 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 8 dager</span>');
              }
              else if(d.getDate() + 9 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 9 dager</span>');
              }
              else if(d.getDate() + 10 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 10 dager</span>');
              }
              else if(d.getDate() + 11 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 11 dager</span>');
              }
              else if(d.getDate() + 12 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 12 dager</span>');
              }
              else if(d.getDate() + 13 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 13 dager</span>');
              }
              else if(d.getDate() + 14 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 14 dager</span>');
              }
              else if(d.getDate() + 15 == datevalue.getDate()) {
                $('#' + divid).append('<span class="annendag">Om 15 dager</span>');
              }
              else {
                $('#' + divid).append('<span class="annendag">Om 16+ dager</span>');
              }
              divid = divid + 1;
            }
            else {
              return false;
            }
        }
      );}
    });
  });
  })();
});
