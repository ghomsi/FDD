'use strict';

/**
 * @ngdoc directive
 * @name fouilleDeDonneesProjetsApp.directive:sheetJsExcute
 * @description
 * # sheetJsExcute
 */
angular.module('fouilleDeDonneesProjetsApp')
  .directive('sheetJsExcute', function ($rootScope) {
    return {
      //scope: { },
      restrict: 'AE',//E = element, A= Attribute, C = Class, M = Comment
      link: function postLink(scope,element, attrs) {

        element.on('change', function (changeEvent) {


          var reader = new FileReader();

          reader.onload = function (e) { //alert('son');
            /* read workbook */
            var bstr = e.target.result;
            var workbook = XLSX.read(bstr, {type:'binary'});
            var worksheet = workbook.Sheets[workbook.SheetNames[0]];

            //$rootScope.excellHTML = XLSX.utils.sheet_to_html(worksheet);
            $rootScope.json = XLSX.utils.sheet_to_json(worksheet);
            console.log(JSON.stringify($rootScope.json));
            $rootScope.disabledexec=true;
            //$rootScope.apply();

          }
          reader.readAsBinaryString(changeEvent.target.files[0]);
         //End execute


        });


      }
    };
  });
