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
		$scope.gridHeight = $window.innerHeight - 75;
		$scope.restrictedHeight = $window.innerHeight - 200;

		loadRemoteData();

		/** Public Methods **/
		
		$scope.updateMode = function(newMode){
			$scope.mode = newMode;
			ListDataFactory.updateMode(newMode);
		}

		$scope.$on('entityTypesLoaded', function(){
			$scope.isLoading = false;
		});

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
			console.log("entityTypesLoaded called..");
			$scope.headers = ListDataFactory.getListEntityTypes();
			if(!$scope.isListLoadedOnce && $scope.list_index < 4){
				$scope.isListLoadedOnce = true;
				$scope.selectedList = $scope.headers[$scope.list_index - 1];
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

		$scope.getSortedData = function(){
			return $filter('orderBy')($scope.data, [$scope.firstOrderPredicate, $scope.orderByPredicate]);
		}

	})