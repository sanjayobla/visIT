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
	      "color": "#a6cee3"
	    },
	    {
	      "key": "hypothesis 1",
	      "type": "line",
	      "axis": "y",
	      "color": "#1f78b4"
	    },
	    {
	      "key": "hypothesis 2",
	      "type": "line",
	      "axis": "y",
	      "color": "#b2df8a"
	    },{
	      "key": "hypothesis 3",
	      "type": "line",
	      "axis": "y",
	      "color": "#33a02c"
	    },{
	      "key": "hypothesis 4",
	      "type": "line",
	      "axis": "y",
	      "color": "#fb9a99"
	    },{
	      "key": "hypothesis 5",
	      "type": "line",
	      "axis": "y",
	      "color": "#e31a1c"
	    },{
	      "key": "hypothesis 6",
	      "type": "line",
	      "axis": "y",
	      "color": "#fdbf6f"
	    },{
	      "key": "hypothesis 7",
	      "type": "line",
	      "axis": "y",
	      "color": "#ff7f00"
	    },{
	      "key": "hypothesis 8",
	      "type": "line",
	      "axis": "y",
	      "color": "#cab2d6"
	    },{
	      "key": "hypothesis 9",
	      "type": "line",
	      "axis": "y",
	      "color": "#6a3d9a"
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