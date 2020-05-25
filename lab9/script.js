
angular.module('photoUpload', ['ngRoute', "ngFileUpload","firebase"])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            temlateUrl: 'main.html',
            controller: 'MainCtrl'
        }).when('/gallery', {
            temlateUrl: 'gallery.html',
            controller: 'GalleryCtrl'
        }).when('manage',{
         	temlateUrl: 'manage.html',
            controller: 'ManageCtrl'
        }).otherwise({
            redirectTo: '/'
        })
    }])

    .controller('MainCtrl', ['$scope','$firebaseStorage','$firebaseArray', function($scope,$firebaseStorage,$firebaseArray) {
        var uploadbar = document.getElementById("uploadbar");
        $scope.tags={};
        $scope.displayMsg=true;
        $scope.msg="No File selected. Please select a file ti upload.";
        $scope.selectFile = function(file) {
            $scope.fileList = file;
            $scope.displayMsg=false;
        };
        $scope.removeFile=function(file){
        	var index=$scope.fileList.indexOf(file);
        	$scope.fileList.splice(index,1);
        	if($scope.fileList.length<1){
        		$scope.displayMsg=true
        	}
        };
        $scope.uploadFile= function(file){
        	var file=file;
        	var tags=$scope.tags.name;
        	if(tags=undefined){
        		tags=null;
        	}
        	var storageRef=firebase.storage().ref('Photos/'+ file.name);
        	var storage=$firebaseStorage(storageRef);
        	var uploadTask=storage.$put(file);

        	uploadTask.$progress(function(snapshot){

        		var percentageUpload = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        		$scope.percentage=percentageUpload .toFixed(0);
        		uploadbar.style.width=$scopepercentage+ '%';
        	});
        	uploadTask.$complete(function(snapshot){
        		$scope.removeFile(file);
        		$scope.msg="Photo uploaded Successfuly.Select image to upload"
        		var imageUrl=snapsot.downloadURL;
        		var imageName= snapsot.metadata.name;

        		var ref=firebase.database().ref("Images");
        		var urls=$firebaseArray(ref);

        		urls.$add({
        			imageUrl:imageUrl,
        			imageName:imageName,
        			tags:tags
        		}).then(function(ref){
        			var id=ref.key;
        			console.log("Image added to the database siccesfully with ref key -" + id);
        			urls.$indexFor(id);
        		});
        		uploadTask.$error(function(error){
        			console.lof(error)
        		});

        	});
        };
    }])

    .controller('GalleryCtrl', ['$scope','$firebaseArray', function($scope,$firebaseArray) {
    	var ref= firebase.database().ref('Images')
    	var urls=$firebaseArray(ref);
    	$scope.urls=urls;
    }])
    .controller('MangeCtrl', ['$scope','$firebaseArray','$firebaseStorage', function($scope,$firebaseArray,$firebaseStorage){
    	var ref= firebase.database().ref('Images')
    	var urls=$firebaseArray(ref);
    	$scope.urls=urls;
    	$csope.deleteFile= function(url){
    		var storageRef=firebase.storage().ref('Photos/'+ url.imageName);
        	var storage=$firebaseStorage(storageRef);
        	storage.$delete().then(function(){
        		console.log("Deleted Photo successfully";
        	}).catch(function(error){
        		console.log(error.message);
        	});
    	};
    }])