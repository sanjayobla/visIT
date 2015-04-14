angular.module('inspinia')
	.controller('ListController', function($scope, $window, $filter, ListDataFactory){
		

		//the below call would return an empty array when the controller is 
		//called before the data is loaded, but would return the list of entities
		//when the list is added dynamically..
		$scope.headers = ListDataFactory.getListEntityTypes();
		$scope.isListLoadedOnce = false;
		$scope.isListLoading = false;
		$scope.previousList = undefined;
		$scope.selectedListItems = [];
		$scope.selectedList = "";

		$scope.data = []; // will contain the complete data that comes from the server..
		$scope.orderByPredicate = "name";
		$scope.firstOrderPredicate = "";

		$scope.dataWatchFlag = 0; //dummy flag that gets updated everytime the overview scroller should change..

		var notification;

		$scope.isLoading = true;
		$scope.mode  = "Any";
		
		$scope.width = $window.innerWidth - 40;
		$scope.height = $window.innerHeight;
		$scope.gridHeight = 522;
		$scope.restrictedHeight = 412;

		// $scope.gridHeight = $window.innerHeight - 75;
		// $scope.restrictedHeight = $window.innerHeight - 200;

		loadRemoteData();

		/** Public Methods **/
		
		$scope.updateMode = function(newMode){
			$scope.mode = newMode;
			ListDataFactory.updateMode(newMode);
		}

		/** Private Methods **/ 

		function loadRemoteData(){
			console.log("loadRemoteData is called!");
			ListDataFactory.init($scope.mode);
		}


		$scope.$on('loadComplete', function(){
			$scope.isListLoading = false;
			if(notification){
				notification.close();
				notification = undefined;
			}
			$scope.dataWatchFlag ++;
			resetDisplayList();
		});

		$scope.$on('entityTypesLoaded', function(){
			$scope.isLoading = false;
			console.log("entityTypesLoaded called..");
			$scope.headers = ListDataFactory.getListEntityTypes();
			if(!$scope.isListLoadedOnce){
				$scope.isListLoadedOnce = true;
				$scope.selectedList = $scope.headers[1];
				$scope.listChanged();
			}
		});

		function resetDisplayList(){
			$scope.loadMoreData(true);
		}

		/** Public methods **/
		$scope.listChanged = function(){
			if($scope.previousList){
				$scope.selectedListItems = [];
				ListDataFactory.setSelectedListItem($scope.previousList, $scope.selectedListItems);
			}
			$scope.data = ListDataFactory.getListContents($scope.selectedList);
			$scope.totalRecords = $scope.data.length;
			$scope.loadMoreData(true);
			$scope.dataWatchFlag ++;
			$scope.previousList = $scope.selectedList;
		}

		$scope.clearSelections = function(){
			$scope.selectedListItems = [];
			ListDataFactory.setSelectedListItem($scope.selectedList, $scope.selectedListItems);
		}

		$scope.loadMoreData = function(isFirstLoad){
			$scope.listData = []
			var _newData = $filter('orderBy')($scope.data, [$scope.firstOrderPredicate, $scope.orderByPredicate])
			$scope.listData.push.apply($scope.listData, _newData);
		}

		$scope.setAlignment = function(align){
			$scope.align = align;
		}

		$scope.selectItem = function(itemName, $event, $index){
			$scope.isListLoading = true;
			// if(!notification){
			// 	notification = noty({});
			// }

			if($event){
				//$event is not undefined..
				if($event.shiftKey){
					$scope.selectedListItems = [];
					if($scope.lastMultiSelectPosition){
						//lastMultiSelectPosition is not undefined..
						var startIndex = ($index < $scope.lastMultiSelectPosition)? $index : $scope.lastMultiSelectPosition;
						var endIndex = ($index > $scope.lastMultiSelectPosition)? $index : $scope.lastMultiSelectPosition;

						for(var index=startIndex; index<=endIndex; index++){
							$scope.selectedListItems.push($scope.listData[index]['name']);
						}
					} else {
						$scope.selectedListItems.push(itemName);
						// $scope.lastMultiSelectPosition = $index;
					}
				} else if(($event.metaKey && navigator.platform.indexOf('Mac') > -1) || ($event.ctrlKey && navigator.platform.indexOf('Win') > -1)){
					var index = $scope.selectedListItems.indexOf(itemName);
					if(index != -1){
						$scope.selectedListItems.splice(index, 1);
					} else{
						$scope.selectedListItems.push(itemName);
					}
				} else {
					$scope.selectedListItems = [];
					$scope.selectedListItems.push(itemName);
					// $scope.lastMultiSelectPosition = $index;
				}

			} else {
				//$event is undefined..
				var index = $scope.selectedListItems.indexOf(itemName);
				if(index != -1){
					$scope.selectedListItems.splice(index, 1);
				} else{
					$scope.selectedListItems = [];
					$scope.selectedListItems.push(itemName);
				}
			}

			$scope.lastMultiSelectPosition = $index;
			ListDataFactory.setSelectedListItem($scope.selectedList, $scope.selectedListItems);
			$scope.isMultiSelectMode = false;
		}

		$scope.$watch('orderByPredicate', function(newValue, oldValue){
			resetDisplayList();
			$scope.dataWatchFlag++;
		});

		$scope.setFirstOrderSort = function(sortParams){
			if($scope.firstOrderPredicate == sortParams){
				$scope.firstOrderPredicate = "";
			} else{
				$scope.firstOrderPredicate = sortParams;
			}

			resetDisplayList();
			$scope.dataWatchFlag++;
		}

		$scope.getSortedData = function(){
			return $filter('orderBy')($scope.data, [$scope.firstOrderPredicate, $scope.orderByPredicate]);
		}

	})