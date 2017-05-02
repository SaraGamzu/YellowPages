angular.module('age-filter', [])
    .filter('age', function () {
        return function (input, current) {
            current = Date.parse(current) || Date.now();

            var ageDiffMs = current - new Date(input).getTime();
            var ageDate = new Date(ageDiffMs);

            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
    });
