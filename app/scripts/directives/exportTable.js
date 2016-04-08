(function(){
//export html table to pdf, excel and doc format directive
var exportTable = function(){
var link = function($scope, elm, attr){
$scope.$on(‘export-pdf’, function(e, d){
      elm.tableExport({type:’pdf’, escape:’false’});
 });
$scope.$on(‘export-excel’, function(e, d){
       elm.tableExport({type:’excel’, escape:false});
 });
$scope.$on(‘export-doc’, function(e, d){
     elm.tableExport({type: ‘doc’, escape:false});
 });
}
return {
  restrict: ‘C’,
  link: link
   }
 }
angular
 .module(‘CustomDirectives’, [])
 .directive(‘exportTable’, exportTable);
})();
