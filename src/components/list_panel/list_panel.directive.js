angular.module('inspinia')
	.directive('listView', function($window, $parse){
		return ({
			restrict: "A",
			templateUrl: "components/list_panel/list_view.html"/*,
			controller: 'ListController',
			compile: function(element, attrs){
				return {
					pre:  function($scope, element, attrs){
						$scope.parent_container_selector = "#parentContainer"+$scope.list_index;
		 			},
		 			post: function($scope, element, attrs){
						var svg = d3.select(element[0]).select('svg');
						var frame = svg.select('rect.frame');
						var overviewList = svg.select('#overviewList');
						var mainList = d3.select(element[0]).select('.js-items-list');
					
						function scrollTopTween(scrollTop) { 
						    return function() { 
						        var i = d3.interpolateNumber(this.scrollTop, scrollTop); 
						        return function(t) { this.scrollTop = i(t); }; 
						    }; 
						}

						$scope.$watch('restrictedHeight', function(newHeight, oldHeight){
							svg.attr("height", newHeight);
							frame.attr("height", newHeight);

							refreshOverviewList();
						});

						$scope.$watch('dataWatchFlag', function(){
							refreshOverviewList();
						});

						function refreshOverviewList(){
							if($scope.totalRecords == 0){
								return;
							}

							var itemHeight = $scope.restrictedHeight / $scope.totalRecords;
							var sortedData = $scope.getSortedData();

							if(!sortedData){
								return;
							}

							overviewList.selectAll('.row-item').remove();
							overviewList.selectAll('.row-item')
								.data(sortedData).enter()
								.append("rect")
								.attr("class","row-item")
								.attr("x", 0)
								.attr("y", function(datum, index){
									return index * itemHeight;
								})
								.attr("width", 20)
								.attr("height", itemHeight)
								.attr("style", function(datum){
									var color = "#FFFFFF";
									if(datum.background){
										color = datum.background;
									}
									return "fill: "+ color;
								});
						}
		 			}
				}
			}*/
		});
	});