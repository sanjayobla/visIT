function timelineCtrl($scope){
	$scope.dataset = [
	  {
	    "day": "2013-01-08T00:00:00",
	    "sales": 300,
	    "income": 200,
	    "customers": 30,
	    "units": 130,
	    "dayString": "Montag"
	  },
	  {
	    "day": "2013-01-03T00:00:00",
	    "sales": 200,
	    "income": 130,
	    "customers": 20,
	    "units": 120,
	    "dayString": "Dienstag"
	  },
	  {
	    "day": "2013-01-04T00:00:00",
	    "sales": 160,
	    "income": 90,
	    "customers": 50,
	    "units": 150,
	    "dayString": "Mittwoch"
	  },
	  {
	    "day": "2013-01-05T00:00:00",
	    "sales": 400,
	    "income": 240,
	    "customers": 40,
	    "units": 140,
	    "dayString": "Donnerstag"
	  },
	  {
	    "day": "2013-01-06T00:00:00",
	    "sales": 250,
	    "income": 130,
	    "customers": 60,
	    "units": 160,
	    "dayString": "Freitag"
	  },
	  {
	    "day": "2013-01-07T00:00:00",
	    "sales": 250,
	    "income": 220,
	    "customers": 50,
	    "units": 150,
	    "dayString": "Samstag"
	  }
	];

	  $scope.schema = {
	    day: {
	      type: 'datetime',
	      format: '%Y-%m-%d_%H:%M:%S',
	      name: 'Date'
	    }
	  };

		  $scope.options = {
	  "rows": [
	    {
	      "key": "sales",
	      "type": "spline",
	      "axis": "y",
	      "color": "#1f77b4"
	    },
	    {
	      "key": "customers",
	      "type": "area",
	      "axis": "y",
	      "color": "#ff7f0e"
	    },
	    {
	      "key": "units",
	      "type": "bar",
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