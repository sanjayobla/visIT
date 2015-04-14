'user strict'

function EventsFactory($rootScope){
	var data = [
	  /*{
	    "time": "2013-04-14T04:33:24",
	    "hypothesis 3": 300,
	    "hypothesis 2": 200,
	    "hypothesis 1": 30,
	    "event": "Add Hypothesis 1"
	  },
	  {
	    "time": "2013-01-03T00:00:00",
	    "hypothesis 3": 200,
	    "hypothesis 2": 130,
	    "hypothesis 1": 20,
	    "units": 120,
	    "event": "Add Evidence 1"
	  },
	  {
	    "time": "2013-01-04T00:00:00",
	    "hypothesis 3": 160,
	    "hypothesis 2": 90,
	    "hypothesis 1": 50,
	    "event": "Add Evidence 2"
	  },
	  {
	    "time": "2013-01-05T00:00:00",
	    "hypothesis 3": 400,
	    "hypothesis 2": 240,
	    "hypothesis 1": 40,
	    "event": "Remove Evidence 2"
	  },
	  {
	    "time": "2013-01-06T00:00:00",
	    "hypothesis 3": 250,
	    "hypothesis 2": 130,
	    "hypothesis 1": 60,
	    "event": "Add Entity to Evidence 1"
	  },
	  {
	    "time": "2013-01-07T00:00:00",
	    "hypothesis 3": 250,
	    "hypothesis 2": 220,
	    "hypothesis 1": 50,
	    "event": "Add Entity to Evidence 2"
	  }*/
	];
	function getData(){
		return data;
	}

	function addData(hypothesisNum, evidenceNum, eventType, hypotheses){
		console.log(arguments);
		var temp = {
			time: moment().format('YYYY-MM-DDThh:mm:ss'),
		};
		_.forEach(hypotheses, function(hypothesis, i){
			temp['hypothesis '+i] = hypothesis.count;
		})
		if(evidenceNum === null){
			temp.event = "Add H"+hypothesisNum;
		}
		else {
			if(eventType === 'add'){
				temp.event = "Add Ev"+evidenceNum+" to H"+hypothesisNum;
			}
			else{
				temp.event = "Remove Ev"+evidenceNum+" from H"+hypothesisNum;
			}
		}
		data.push(temp);
		//moment().format('YYYY-MM-DDThh:mm:ss');
		// data.push(n);
		$rootScope.$emit('event:added', data[data.length-1]);
	}

	var factory = {
		getData: getData,
		addData: addData
	};

	return factory;
}
angular.module('inspinia')
	.factory('EventsFactory', EventsFactory);