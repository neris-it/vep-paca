(function () {
    var app = angular.module("allcount");

    app.factory('ScrapingService', function ($http) {
        return {
            fillFromPageJaune: function (url, company, callback) {
                console.log('ScrapingService url ' + url);

                var scrapeUrl = nerisConfig.scrapeUrl + url;
                    
                $http.get(scrapeUrl).then(function(response) {
                    var html = response.data;
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(html, 'text/html');

                    company['name'] = doc.getElementsByClassName('pro-title')[0].innerText.trim();

                    var addressInfo = doc.querySelectorAll('.coord-adress > span')[0];
                    company['address'] = addressInfo.firstChild.innerText.replace(/\s\s+/g, ' ').trim();
                    company['zip_code'] = addressInfo.firstChild.nextSibling.innerText.replace(', ','');
                    company['city'] = addressInfo.lastChild.innerText.trim();

                    var telephone = doc.getElementsByClassName('coord-numero')[0];
                    company['telephone'] = telephone && telephone.innerText.replace('.', '').trim();

                    var siretNode = doc.querySelectorAll('.siret')[0];
                    company['siret'] =  siretNode && siretNode.getElementsByClassName('valeur')[0].innerText.substring(0, 9);;

                    var staffNode = doc.querySelectorAll('.effectif')[0];
                    company['staff_size'] = staffNode && staffNode.getElementsByClassName('valeur')[0].innerText;

                    var activity = doc.getElementsByClassName('sel-activite')[0];
                    company['activity'] = activity && activity.innerText.trim();

                    var webSiteNode = doc.querySelectorAll('.bloc-info-sites-reseaux .premiere-visibilite')[0];
                    company['web_site'] = webSiteNode && webSiteNode.innerText.replace(/\s\s+/g, ' ').trim();

                    company['comment'] = 'Page Jaunes';

                    callback();

                });


            }
        }
    });

    app.factory('SortingService', function () {
        return {
            field: '',
            order: 1,
            setDefault: function (scope) {
                this.field = '';
                this.order = 1;
                scope.filtering.sorting = [[this.field, this.order]];
                scope.updateGrid();
            },
            setValues: function (scope, order) {
                this.field = scope.fd.field;
                this.order = order;
                scope.filtering.sorting = [[this.field, this.order]];
                scope.updateGrid();
            }
        };
    });

    app.directive('ncSortBy', ['SortingService', function (SortingService) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {
                SortingService.setDefault(scope);

                scope.getSortClass = function (field) {
                    if (field === SortingService.field) {
                        if (SortingService.order === 1) {
                            return 'glyphicon glyphicon-chevron-up';
                        } else {
                            return 'glyphicon glyphicon-chevron-down';
                        }
                    } else {
                        return 'glyphicon glyphicon-sort';
                    }
                };

                scope.isNotSortable = function (field) {
                    return (field.indexOf('role_') === 0) || field === 'isGuest';
                };

                element.bind('click', function () {
                    if (SortingService.field === scope.fd.field) {
                        if (SortingService.order === 1) {
                            SortingService.setValues(scope, -1);
                        } else {
                            SortingService.setDefault(scope);
                        }
                    } else {
                        SortingService.setValues(scope, 1);
                    }
                });
            }
        };
    }]);

    app.controller('EntityViewScrapingController', function ($scope, $controller, ScrapingService) {
        angular.extend(this, $controller('EntityViewController', {$scope: $scope}));
        $scope.scrapeFromPageJaune = function () {
            console.log('yihuuu');
            console.log('$scope.createForm.entity ' + JSON.stringify($scope.createForm.entity));
            var company = $scope.createForm.entity();
            $scope.scrapingUrl = $scope.scrapingUrl || 'https://www.pagesjaunes.fr/pros/02539863'; // todo proper validation and error message if empty

            ScrapingService.fillFromPageJaune($scope.scrapingUrl, company, $scope.refreshOnAction);

        };
    });
})();


// onClick='_neris.changeSorting(this)', rel='{{fd.field}}'

// window._neris = new _nerisCrm();
//
// function _nerisCrm(){
//   this._getFields = function(){
//     if(!this.companyFields){
//       console.log('no fields');
//       var c = $("div[ng-controller='EntityViewController']");
//       var tableScope = angular.element(c.find("div.container table.table")).scope();
//       this.companyFields = _.map(tableScope.fieldDescriptions, function (f){
//         return f.field;
//       });
//     }
//   }
//
//   this.changeSorting = function(e) {
//     //var t = e.target;
//     console.log(e);
//   }
// }
