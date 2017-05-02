app.controller('MainCtrl', ['$scope', '$filter', 'MainService', 'filterFilter', function ($scope, $filter, MainService, filterFilter) {
    var ind = 0;
   
    MainService.GetPeoples().then((peoplesRes) => {
        if (peoplesRes.data.peoples) {
            $scope.fullData = angular.copy(peoplesRes.data.peoples);
            $scope.filteredPeoples = angular.copy($scope.fullData);
            $scope.displayPeoples = $scope.fullData.slice(0, 25);
            ind = 0
        }
    }).catch((err) => {
        console.error(err.data.msg);
    });

    $scope.filterPeoples = function () {
        try {
            let wordsToSearch = $scope.searchText.replace(/\s\s+/g, ' ').split(' ');
            $scope.filteredPeoples = $scope.fullData.filter((value) => {
                return wordsToSearch.every((text) => {
                    return (value["name"]).toLowerCase().includes(text.toLowerCase()) ||
                        value["phone"].includes(text) || $filter('age')(value["birthday"]).toString().includes(text);
                })
            })
            $scope.displayPeoples = $scope.filteredPeoples.slice(0, 25);
            ind = 0;
        }
        catch (err){
            console.error(`Filtered people failed. err ${err}`);
        }
    }


    $scope.loadMore = function () {
        try {
        ind = ind + 25
        var numRowsToAdd = 25
        if (ind + 25 >= $scope.filteredPeoples.length) {
            numRowsToAdd = $scope.filteredPeoples.length - ind;
        }
        $scope.displayPeoples = $scope.peoples.concat($scope.filteredPeoples.slice(ind, numRowsToAdd + ind))
        }
        catch (err) {
            console.error(`Load more peoples data was failed. err ${err}`);
        }
    }
}]);