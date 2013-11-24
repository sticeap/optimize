'use strict';

angular.module('mobilaApp')
 	.controller('MainCtrl', function ($scope, $timeout) {

 	$scope.selectedBackground = "";
 	var getRandomColor = function(){
 		return '#'+Math.floor(Math.random()*16777215).toString(16);
 	}

 	$scope.dimension  = '';
 	$scope.backgrounds = ['H1138_ST15.jpg', 'H3006_ST22.jpg'];
 	$scope.selectedBackground = $scope.backgrounds[0];
 	$scope.scale = 3;
 	$scope.placa = '2800x2070';

 	$scope.addPlaca = function(){
 		if(event.keyCode != 13)
 			return;

 		if($scope.dimension.match(/[^\r\n]+/g).length > 0){
 			angular.forEach($scope.dimension.match(/[^\r\n]+/g), function(item, i){
 				var width = parseFloat(item.split('x')[0] * 10) / $scope.scale,
	 				height = parseFloat(item.split('x')[1] * 10) / $scope.scale;

		 	    $('.jumbotron').append('<div class="draggable" style="width: ' + width + 'px; height: ' + height + 'px;"><div class="rotate"></div>' + item + '</div>');
		 		$timeout(function(){
		 			init();
		 		}, 2000);
 			});
 		}
 		if($scope.dimension.split('x').length == 2){

	 		var width = parseFloat($scope.dimension.split('x')[0]) * 10 / $scope.scale,
	 			height = parseFloat($scope.dimension.split('x')[1]) *10 / $scope.scale;

	 	    $('.jumbotron').append('<div class="draggable" style="width: ' + width + 'px; height: ' + height + 'px;"><div class="rotate"></div>' + $scope.dimension + '</div>');
	 		$timeout(function(){
	 			init();
	 		}, 100);
 		}
 	};

 	$scope.$watch('placa', function (newVal, oldVal) {
 		if($scope.placa.split('x').length != 2){
 			return;
 		}

 		var width = parseInt($scope.placa.split('x')[0]) / $scope.scale,
 			height = parseInt($scope.placa.split('x')[1]) / $scope.scale;

 		$('.jumbotron').css({
 			width: width,
 			height: height
 		});
 	});

 	$scope.$watch('selectedBackground', function(newVal, oldVal){
 		$scope.selectedBackground = newVal;

 		$('.jumbotron').css({
 			backgroundImage: 'url(images/' + $scope.selectedBackground + ')'
 		})
 	});

    $(document).ready(function(){
    	window.init = function() {
			$('.draggable').draggable( {
				containment: '.jumbotron',
				cursor: 'move',
				snap: '.draggable',
			    //snapMode:'inner-top',//should say "inner-top" but this is not an available option
			    snapTolerance:10
			});
		}

		init();

		$(document).on('click', '.rotate', function(){
			var width = $(this).parent().width(),
				height = $(this).parent().height();

			$(this).parent().css({
				width: height,
				height: width
			});
		});
    });

    window.$scope = $scope;
});
