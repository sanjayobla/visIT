'user strict'

function EvidencesFactory($rootScope){
	var data = [
		{
			title:'Evidence 1 (110203.txt)',
			data: [{
				name:'Anand',
				category: 'Name',
				type: 'label-success'
				}, {
				name: 'GT',
				category: 'Organization',
				type: 'label-info'
				},{
				name: '2011',
				category: 'Date',
				type: 'label-warning'
			}]
		}
	];
	function getData(){
		return data;
	}

	function addData(n){
		data.push(n);
		$rootScope.$emit('evidences:added', n);
	}

	var factory = {
		getData: getData,
		addData: addData
	};

	return factory;
}
angular.module('inspinia')
	.factory('EvidencesFactory', EvidencesFactory);