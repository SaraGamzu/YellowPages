app.directive('peoples', function () {
    return {
        scope: {
            peoplesData: '='
        },
        templateUrl: 'js/directive/peoples/peoples.html'
    }
})