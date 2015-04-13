'user strict'

function HypothesesFactory($rootScope){
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
		// $rootScope.$emit('addHypothesisBox', data);
		$rootScope.$emit('hypothesis:added', n);
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