angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/start.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;

      //if( localStorage.getItem('ytjhaku-intro') )
      $scope.modal.show();
    });



  // Triggered in the login modal to close it
  $scope.closeStart = function() {
    $scope.modal.hide();
    localStorage.setItem('ytjhaku-intro',1);
  };




})



.controller('NimiCtrl', function($scope,$ionicModal,YTJ,$location,$timeout) {

  $scope.LANG = 'FI';


  $scope.getYritys = function(nimi){
    if(!nimi) return;
    $scope.noresults = false;
    $scope.loading = true;
    $scope.yritykset = [];

    if( $location.path().indexOf('ytunnus') >= 0 ){
      YTJ.ytunnus(nimi).then( function(data) {
        $scope.loading = false;
        $scope.yritykset = data.results;

      },function(reason) {
        $scope.loading=false;
        $scope.noresults = true;
      });
    }else {
      YTJ.nimi(nimi).then( function(data) {
        $scope.loading = false;
        $scope.yritykset = data.results;

      },function(reason) {
        $scope.loading=false;
        $scope.noresults = true;
      });
    }




  }



  var openYritysModal = function(yritysParam) {
    console.log(yritysParam)
    $ionicModal.fromTemplateUrl('templates/yritys.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;

      var yritys = yritysParam;
      yritys.addresses = _.uniq(yritys.addresses,function(item){return item.street } );
      yritys.contactDetails = _.uniq(yritys.contactDetails,function(item){return JSON.stringify(item) } )

      $scope.detail = yritys;

      var addresses = [];
      _.map(yritys.addresses, function(address) {
        addresses.push(address.street + ' '+ address.postCode +' '+address.city)
      })

      $scope.modal.show();
      $scope.showMap = true

      $timeout(function() {
        startMap(addresses)
      },1000);
    });

  }

    var bounds,geocoder, mapElement,
      infowindow = new google.maps.InfoWindow();

  var startMap = function(addresses) {

    console.log('starting map')
    if(!addresses.length)
      return;

    geocoder = new google.maps.Geocoder();
    bounds = new google.maps.LatLngBounds();

    var mapOptions = {
      // How zoomed in you want the map to start at (always required)
       zoom: 5,

      // The latitude and longitude to center the map (always required)
      center: new google.maps.LatLng(61.000, 23.000), // New York
      disableDefaultUI: true,
      navigationControl: false, 
      mapTypeControl: false, 
      scaleControl: false,

      styles:[
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#68d6be"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]
    };
       mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above

        $scope.map = new google.maps.Map(mapElement, mapOptions);


        _.map(addresses, function(address) {
     
          geocoder.geocode({address:address}, function (results,status)
          { 
              if (status == google.maps.GeocoderStatus.OK) {
                var p = results[0].geometry.location;
                var lat=p.lat();
                var lng=p.lng();
                createMarker(address,lat,lng);
              }
              else {
                 //nah 
              }
            }
          );
        })
                
  }

  var createMarker = function(add,lat,lng) {
    var contentString = add;
    var marker = new google.maps.Marker({
       position: new google.maps.LatLng(lat,lng),
       map: $scope.map,
       icon: 'img/marker.png'

      });

    google.maps.event.addListener(marker, 'click', function() {
       infowindow.setContent(contentString); 
       infowindow.open(map,marker);
     });

     //bounds.extend(marker.position);

   }



  $scope.openYritys = function(id){
      if($scope.yritykset[id].detailsUri){
        $scope.loading = true;
      // get detail
      YTJ.ytunnus($scope.yritykset[id].businessId).then( function(data) {
        openYritysModal(data.results[0]);
        $scope.loading = false;
      });


    } else {
      openYritysModal($scope.yritykset[id])
    }



    $scope.close = function() {
      $scope.showMap = false;
      $scope.map = {};
      $scope.modal.hide();
    };

  }




})

.controller('YtunnusCtrl', function($scope) {



})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

