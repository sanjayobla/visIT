function timelineCtrl($scope, EventsFactory){
	$scope.displayType = 'time';
	$scope.$watch('displayType', function(){
		// console.log(arguments);
		$scope.options.xAxis.key = $scope.displayType; 
	});
	$scope.dataset = EventsFactory.getData();

	  $scope.schema = {
	    time: {
	      type: 'datetime',
	      format: '%Y-%m-%dT%H:%M:%S',
	      name: 'Date'
	    }
	  };

		  $scope.options = {
	  "rows": [
	    {
	      "key": "hypothesis 0",
	      "type": "line",
	      "axis": "y",
	      "color": "#1f77b4"
	    },
	    {
	      "key": "hypothesis 1",
	      "type": "line",
	      "axis": "y",
	      "color": "#ff7f0e"
	    },
	    {
	      "key": "hypothesis 2",
	      "type": "line",
	      "axis": "y",
	      "color": "#2ca02c"
	    }
	  ],
	  "subchart": {
	    "selector": true,
	    "show": true
	  },
	  "zoom": {
	    "range": [
	      1.1,
	      3.9
	    ]
	  },
	  "xAxis": {
      "key": "time",
      "displayFormat": "%Y-%m-%d",
    },
	  "selection": {
	    "selected": []
	  },
	  "size": {
	      "height": 500
	    },
	  "type": "line"
	};
}

angular
	.module('inspinia')
	.controller('timelineCtrl', timelineCtrl)