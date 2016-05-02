.service('fileUploadService', ['$http', function ($http) {
  this.uploadFileToUrl = function(file, uploadUrl, params){
    var fd = new FormData();
    fd.append('file', file);
    var promise = $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined},
      params: params
    });
    return promise;
  }
}])

$scope.doCrop = function() {
  if ($imageService.cropType === 'square') { $imageService.myLogoCroppedImage = $scope.myCroppedImage; }
  else { $imageService.myBannerCroppedImage = $scope.myCroppedImage; }

  $scope.hide();

  var uploadUrl = 'http://45.55.7.118:5000/api/company/branch/4/upload/logo';
  console.log($imageService.myLogoCroppedImage);
  fileUploadService.uploadFileToUrl(
    $imageService.myBannerCroppedImage, uploadUrl, {}).then(function(resp) {
      console.log(resp);
    })
};
