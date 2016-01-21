angular.module('Auth', [])

.controller('MyController', function ($scope, $http) {

  $scope.authenticate = function (user) {
    $http.post('/api/auth', user)
    .then(function (response) {
      console.info(response);
      alertify.success('You are logged in!');
    })
    .catch(function (err) {
      console.error(err);
      alertify.error('Could not authenticate user :(');
    })
  };

  $http.get('/api/get-user')
  .then(function (response) {
    alertify.log(response);
  })
  .catch(function (err) {
    alertify.error(err);
  });

});
