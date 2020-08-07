//var
var datevalue, mnth, divid = 1, symbol, lat, lon, std, varabcde, _MS_PER_DAY, utc1, utc2, mappos, stedsnavnsted;
const d = new Date();
//console log
console.ownlog = function() {
  for (var o of arguments) console.log(o);console.log('');
};
//Første bokstav
function cfl(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//mellom datoer
function dd(date2, date1) {
    _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
}
// Write Javascript code!

/*fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.294388&lon=5.277333')
  .then(response => response.json())
  .then(data => {
  	// Do something with your data
  	console.ownlog(data);
});*/

$('document').ready(function() {
  load();
  mapboxgl.accessToken = 'pk.eyJ1IjoibGlsbGVhaWxhIiwiYSI6ImNrZGlrMHNpZDA1aGIydHJvZmo0MjltaWsifQ.sx5uS4van5M8gU3I-djMDQ';
    var map = new mapboxgl.Map({
        container: 'map',
        center: [5.277307, 60.294371], // starting position
        zoom: 17,
        style: 'mapbox://styles/mapbox/streets-v11'
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
          trackUserLocation: false
      }));

      //map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));

      map.scrollZoom.enable();
      map.dragPan.enable();
      map.dragRotate.enable();
      map.doubleClickZoom.disable();
      map.touchZoomRotate.enable();
      map.touchPitch.enable();
      map.on('click', function(e) {
          console.log('A click event has occurred at ' + e.lngLat);
          console.log('Lng: ' + e.lngLat.lng);
          console.log('Lat: ' + e.lngLat.lat);
          onload(e.lngLat.lat, e.lngLat.lng);
          //$('#app').text(e.lngLat);
      });
});

function load() {
  (function () {
    //——\\
    //                    watchPosition()
    navigator.geolocation.getCurrentPosition(function (position) {
      //Coordinate
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      $.ajax({
        url: 'https://api.opencagedata.com/geocode/v1/json?q=' + lat + '%2C%20' + lon + '&key=94d01d632a064c0ea8ad9ae4be4ee8a5',
        type: 'get',
        dataType: 'json',
        success: function(data) {
            //——\\
          std = data.results[0].components.road;
          onload(lat, lon, std);
        },
        error: function() {
            console.log(':(');
        }
      });
      console.ownlog('Lat:', lat, 'Lon:', lon);
      //onload(lat, lon, 'Her')
  });
  })();
};

$('#sted').click(function() {
  opencage(prompt(cfl('Værmelding for…')))
});
$('#her').click(function() {
  load()
});

function opencage(sted) {
   //var sted = cfl(prompt('Værmelding for…'));
    $.ajax({
        url: 'https://api.opencagedata.com/geocode/v1/json?q=' + sted + '&key=94d01d632a064c0ea8ad9ae4be4ee8a5',
        type: 'get',
        dataType: 'json',
        success: function(data) {
            //——\\
            console.log('Lat: ' + data.results[0].geometry.lat);
            console.log('lng: ' + data.results[0].geometry.lng);
            onload(data.results[0].geometry.lat, data.results[0].geometry.lng, sted);
        },
        error: function() {
            console.log(':(');
        }
    })
}

function onload(latal, lonol, stedsnavn) {
    if(stedsnavn != 0 && stedsnavn != undefined && stedsnavn != null && stedsnavn != '' && stedsnavn != ' ') {
        stedsnavnsted = stedsnavn;
    }
    else {
        stedsnavnsted = 'Lat: <b>' + latal + '</b> Lon: <b>' + lonol + '</b>';
    }
    //map.setCenter([latal, lonol]);
  $('#app').text('');
  divid = 1;
  $.ajax({
        url: 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' + latal + '&lon=' + lonol,
        type: 'get',
        dataType: 'json',
        success: function(data) {
          console.ownlog('Data:', data, '',
          'Data.geometry.coordinates:', data.geometry.coordinates, '',
          'Data.properties.timeseries:', data.properties.timeseries, '',
          'Grader C°:', data.properties.timeseries[0].data.instant.details.air_temperature + 'C°');
          $('#app').html(`<h1 class="verfor">Værmelding for ` + cfl(stedsnavnsted) + `.</h1>`)
          //——\\

          for (const value of data.properties.timeseries) {
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
              else if(dd(d, datevalue) == 1) {
                $('#' + divid).append('<span class="annendag">I Morgen</span>')
              }
              else if(dd(d, datevalue) == 2) {
                $('#' + divid).append('<span class="annendag">I Overmorgen</span>')
              }
              else {
                varabcde = dd(d, datevalue)
                $('#' + divid).append('<span class="annendag">Om ' + varabcde + ' dager</span>')
              }
              divid = divid + 1;
            }
            else {
              return false;
            }
        }
      }
    });
}
