'user strict'

function EntityFactory($rootScope){
	var data = [{
		name: 'Pranav',
		category: 'Name',
		type: 'label-success',
		loc: 0
	},{
		name: 'GT',
		category: 'Organization',
		type: 'label-info',
		loc: 1
	},{
		name: '2011',
		category: 'Date',
		type: 'label-warning',
		loc: 2
	}];
	
	function getData(){
		return data;
	}

	function addData(n){
		data.push(n);
		$rootScope.$emit('entity:added', n);
	}

	var factory = {
		getData: getData,
		addData: addData
	};

	return factory;
}
angular.module('inspinia')
	.factory('EntityFactory', EntityFactory);