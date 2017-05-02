app.controller('MainCtrl', ['$scope', '$filter', 'MainService', 'filterFilter', function ($scope, $filter, MainService, filterFilter) {
    var ind = 0;

    MainService.GetPeoples().then((peoplesRes) => {
        if (peoplesRes && peoplesRes.data.peoples) {
            $scope.fullData = peoplesRes.data.peoples.sort(sortByName);
            $scope.displayPeoples = $scope.fullData.slice(0, 20);
            ind = 0;
        }
        upddateDisplayMsg();
    }).catch((err) => {
        upddateErrMsg("Opps... Error in loading data :(");
        console.error(err.data.msg);
    });

    $scope.filteredPeoples = function () {
        try {
            $scope.displayPeoples = filteredPeoplesByMultipleAtrributes($scope.fullData.slice(0, 20));
            upddateDisplayMsg();
            ind = 0;
        }
        catch (err) {
            upddateErrMsg("Opps... error in filtering data");
            console.error(`Filtered people failed. Error: ${err}`);
        }
    }


    $scope.loadMore = function () {
        try {
            ind = ind + 20
            var numRowsToAdd = 20
            if (ind + 20 >= $scope.fullData.length) {
                numRowsToAdd = $scope.fullData.length - ind;
            }

            if ($scope.searchText) {
                let filterResults = filteredPeoplesByMultipleAtrributes($scope.fullData.slice(ind, numRowsToAdd + ind));
                $scope.displayPeoples = $scope.displayPeoples.concat(filterResults);
            }
            else {
                $scope.displayPeoples = $scope.displayPeoples.concat($scope.fullData.slice(ind, numRowsToAdd + ind));
            }
        }
        catch (err) {
            upddateErrMsg("Ops.. error in loading more data.");
            console.error(`Load more peoples data was failed. Error: ${err}`);
        }
    }

    function upddateDisplayMsg() {
        $scope.resultMsg = (!$scope.displayPeoples || $scope.displayPeoples.length === 0) ? "There is no data to display" : "Search results";
    }

    function upddateErrMsg(msg) {
        $scope.resultMsg = msg;
    }

    function filteredPeoplesByMultipleAtrributes(peoplesData) {
        let wordsToSearch = $scope.searchText.replace(/\s\s+/g, ' ').split(' ');
        return peoplesData.filter((people) => {
            return wordsToSearch.every((text) => {
                let equalToName = people["name"] && people["name"].toLowerCase().includes(text.toLowerCase());
                let equalToAge = people["age"] && $filter('age')(people["birthday"]).toString().includes(text);
                let equalToPhone = people["phone"] && people["phone"].includes(text);
                return equalToName || equalToAge || equalToPhone;
            })
        })
    }

    function sortByName(a, b) {
        return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
    }

}]);
