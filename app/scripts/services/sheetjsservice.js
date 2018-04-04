'use strict';

/**
 * @ngdoc service
 * @name fouilleDeDonneesProjetsApp.SheetJSService
 * @description
 * # SheetJSService
 * Factory in the fouilleDeDonneesProjetsApp.
 */
angular.module('fouilleDeDonneesProjetsApp')
  .factory('SheetJSService', function () {
    // Service logic
    // ...


    var meaningOfLife = 42;

    // Public API here
    return {
      xlsx: function(data){

        /* generate a worksheet */
        var ws = XLSX.utils.json_to_sheet(data);

        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "data");

        /* write workbook and force a download */
        var extension = "FDD_fichier_modele";

        XLSX.writeFile(wb, extension+".xlsx");
      }
    };
  });
