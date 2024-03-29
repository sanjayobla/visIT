'user strict'

function HypothesesFactory($http, $rootScope, EventsFactory, EvidencesFactory){
	var data = [
			/*{
				title:'Anand Framed Roger Rabbit',
				count: 0,
				overallWeights: [5, 7, 3],
				data: {
					positive: {
					  data: ["Evidence 11", "Evidence 2"]
					},
					negative: {
					  data: ["Evidence 3", "Evidence 4"]
					},
					neutral: {
					  data: ["Evidence 5", "Evidence 6"]
					}
				}
			}*/
	];

	initFactory();

	function initFactory(){
		return $http.get('/data/get-all-hypothesis').then(function(response) {
	   		var temp = _.map(response.data, function(datum){
	   			datum.threshold = datum.threshold || 10;
	   			return datum;
	   		});
			
			data = temp;
	   		$rootScope.$emit('hypotheses:retrieveDB', response.data);
	    });
	}

	function getData(){
		// console.log("getData called", data);
		return data;
	}

	function addData(n){
		return $http({
	    	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    	url: '/data/create-hypothesis',
	    	method: "POST",
	    	data: "hypothesis="+n.title,
	    })
        .success(function(hypothesis_id) {
        	n.id = hypothesis_id;
        	n.threshold = 10;
        	data.push(n);
        	// console.log("Node pushed", n);
        	EventsFactory.addData(data.length-1, null, 'add', data);
        	$rootScope.$emit('hypothesis:added', n);
        });
		// console.log("hypothesis added..", n);
		// data.push(n);
		// // $rootScope.$emit('addHypothesisBox', data);
		// $rootScope.$emit('hypothesis:added', n);
	}

	function getEvidenceNum(value, directValue){
		return _.findIndex(EvidencesFactory.getData(), function(evidence) {
			if(directValue) return value === evidence.title;
		  return value.title == evidence.title;
		});
		/*return _.forEach(EvidencesFactory.getData(), function(evidence, i){
			if(value.title === evidence.title) return i;
		});*/
	}


	function getHypothesisNum(value){
		return _.findIndex(data, function(hypothesis) {
		  return value.title == hypothesis.title;
		});
		/*return _.forEach(data, function(hypothesis, i){
			if(value.title === hypothesis.title) return i;
		});*/
	}
	function addEvidenceTo(hypothesis, evidence, pnnType){
		// console.log(hypothesis, evidence, pnnType);
		if(hypothesis.data.positive.data.indexOf(evidence.title) > -1) return;
		if(hypothesis.data.neutral.data.indexOf(evidence.title) > -1) return;
		if(hypothesis.data.negative.data.indexOf(evidence.title) > -1) return;

		// /add-evidence-to-hypothesis

		return $http({
	    	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    	url: '/data/add-evidence-to-hypothesis',
	    	method: "POST",
	    	data: "hypothesis_id="+hypothesis.id+"&evidence_id="+evidence.id+"&rel_type="+pnnType,
	    })
        .success(function(link_id) {
        	hypothesis.data[pnnType].data.push(evidence.title);
			if(pnnType === 'positive') {
				hypothesis.count++;
				hypothesis.overallWeights[0]++;
			}
			else if(pnnType === 'negative') {
				hypothesis.count--;
				hypothesis.overallWeights[1]++;
			}
			else hypothesis.overallWeights[2]++;
			EventsFactory.addData(getHypothesisNum(hypothesis), getEvidenceNum(evidence), 'add', data);
			$rootScope.$emit('hypothesis:changed', hypothesis);
    });
	}

	function removeEvidenceFrom(hypothesis, evidence, pnnType){
		console.log(hypothesis, evidence, pnnType);
		return $http({
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    	url: '/data/delete-evidence-from-hypothesis',
	    	method: "POST",
	    	data: "hypothesis_id="+hypothesis.id+"&rel_type="+pnnType+"&evidence="+evidence
		}).success(function(){
			_.remove(hypothesis.data[pnnType].data, function(n) {
				return n === evidence;
			});
			if(pnnType === 'positive') {
				hypothesis.count--;
				hypothesis.overallWeights[0]--;
			}
			else if(pnnType === 'negative') {
				hypothesis.count++;
				hypothesis.overallWeights[1]--;
			}
			else hypothesis.overallWeights[2]--;
			// console.log(arguments, hypothesis);
			EventsFactory.addData(getHypothesisNum(hypothesis), getEvidenceNum(evidence, true), 'remove', data);
			$rootScope.$emit('hypothesis:changed', hypothesis)
		});

	}

	function changeThresholdOf(hypothesis, data){
		if(Math.abs(hypothesis.threshold - Math.round(data)) >= 1){
			hypothesis.threshold = Math.round(data);
			// console.log('threshold changed')
			$rootScope.$emit('hypothesis:thresholdChanged', hypothesis, data);
			return;
		}
		// console.log('threshold unchanged')
	}

	function deleteAll(){
		return $http.get('/data/delete-all-hypotheses').then(function(response) {
	   		data.length = 0
	   		$rootScope.$emit('hypotheses:retrieveDB', data);
	    });
	}

	$rootScope.$on('evidencesDeleted', function(event, args){
		for(var index in data){
			var hypothesis = data[index];
			hypothesis.data.positive.data.length = 0;
			hypothesis.data.negative.data.length = 0;
			hypothesis.data.neutral.data.length = 0;
			hypothesis.count = 0;
			hypothesis.overallWeights[0] = 0;
			hypothesis.overallWeights[1] = 0;
			hypothesis.overallWeights[2] = 0;
		}
	});

	var factory = {
		getData: getData,
		addData: addData,
		addEvidenceTo: addEvidenceTo,
		removeEvidenceFrom:removeEvidenceFrom,
		changeThresholdOf:changeThresholdOf,
		deleteAll: deleteAll
	};

	return factory;
}

angular.module('inspinia')
	.factory('HypothesesFactory', HypothesesFactory);