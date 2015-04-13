function timelineCtrl($scope){
	$scope.displayType = 'day';
	$scope.$watch('displayType', function(){
		// console.log(arguments);
		$scope.options.xAxis.key = $scope.displayType; 
	});
	$scope.dataset = [
	  {
	    "day": "2013-01-09T00:00:00",
	    "hypothesis 3": 300,
	    "hypothesis 2": 200,
	    "hypothesis 1": 30,
	    "units": 130,
	    "dayString": "Add Hypothesis 1"
	  },
	  {
	    "day": "2013-01-03T00:00:00",
	    "hypothesis 3": 200,
	    "hypothesis 2": 130,
	    "hypothesis 1": 20,
	    "units": 120,
	    "dayString": "Add Evidence 1"
	  },
	  {
	    "day": "2013-01-04T00:00:00",
	    "hypothesis 3": 160,
	    "hypothesis 2": 90,
	    "hypothesis 1": 50,
	    "units": 150,
	    "dayString": "Add Evidence 2"
	  },
	  {
	    "day": "2013-01-05T00:00:00",
	    "hypothesis 3": 400,
	    "hypothesis 2": 240,
	    "hypothesis 1": 40,
	    "units": 140,
	    "dayString": "Remove Evidence 2"
	  },
	  {
	    "day": "2013-01-06T00:00:00",
	    "hypothesis 3": 250,
	    "hypothesis 2": 130,
	    "hypothesis 1": 60,
	    "units": 160,
	    "dayString": "Add Entity to Evidence 1"
	  },
	  {
	    "day": "2013-01-07T00:00:00",
	    "hypothesis 3": 250,
	    "hypothesis 2": 220,
	    "hypothesis 1": 50,
	    "units": 150,
	    "dayString": "Add Entity to Evidence 2"
	  }
	];

	  $scope.schema = {
	    day: {
	      type: 'dateday',
	      format: '%Y-%m-%d_%H:%M:%S',
	      name: 'Date'
	    }
	  };

		  $scope.options = {
	  "rows": [
	    {
	      "key": "hypothesis 1",
	      "type": "spline",
	      "axis": "y",
	      "color": "#1f77b4"
	    },
	    {
	      "key": "hypothesis 2",
	      "type": "spline",
	      "axis": "y",
	      "color": "#ff7f0e"
	    },
	    {
	      "key": "hypothesis 3",
	      "type": "spline",
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
      "key": "day",
      // "selector": true
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