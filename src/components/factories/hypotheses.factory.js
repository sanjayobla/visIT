'user strict'

function HypothesesFactory($rootScope){
	var data = [
			{
				title:'Anand Framed Roger Rabbit',
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
			}
		]
	function getData(){
		return data;
	}

	function addData(n){
		data.push(n);
		// $rootScope.$emit('addHypothesisBox', data);
		$rootScope.$emit('hypothesis:added', n);
	}

	var factory = {
		getData: getData,
		addData: addData
	};

	return factory;
}
angular.module('inspinia')
	.factory('HypothesesFactory', HypothesesFactory);