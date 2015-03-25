angular.module('starter.services', [])

.value('corsURL', '//cors-anywhere.herokuapp.com/')
.value('APIURL', 'http://avoindata.prh.fi/bis/v1/')
.factory('YTJ', function ($http, $q,corsURL,APIURL) {
  

  return {
    ytunnus: function(param) {
      var deferred = $q.defer();
      $http.get(corsURL+APIURL+param,{})
      .success(function(data, status , header, config){
        deferred.resolve(data)
      })
      .error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise;
    },
    nimi:function(name) {
      var deferred = $q.defer();
      $http.get(corsURL+APIURL, {
        params: { name: name }
      })
      .success(function(data, status , header, config){
        console.log('success')
        deferred.resolve(data)
      })
      .error(function(data) {

        deferred.reject(data)
      })
      return deferred.promise;
    }
  }




});


