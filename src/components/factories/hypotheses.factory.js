'user strict'

function HypothesesFactory($rootScope, EventsFactory, EvidencesFactory){
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
		]
	function getData(){
		return data;
	}

	function addData(n){
		data.push(n);
		EventsFactory.addData(data.length-1, null, 'add', data);
		// $rootScope.$emit('addHypothesisBox', data);
		$rootScope.$emit('hypothesis:added', n);
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
		// console.log(arguments);
		if(hypothesis.data.positive.data.indexOf(evidence.title) > -1) return;
		if(hypothesis.data.neutral.data.indexOf(evidence.title) > -1) return;
		if(hypothesis.data.negative.data.indexOf(evidence.title) > -1) return;

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
	}

	function removeEvidenceFrom(hypothesis, evidence, pnnType){
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

	}

	var factory = {
		getData: getData,
		addData: addData,
		addEvidenceTo: addEvidenceTo,
		removeEvidenceFrom:removeEvidenceFrom
	};

	return factory;
}
angular.module('inspinia')
	.factory('HypothesesFactory', HypothesesFactory);