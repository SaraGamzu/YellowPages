
app.factory('MainService', ['$http', function ($http) {
    return {
        GetPeoples: function () {
            return $http.get('peoples');
        }
    }
}]);
