'user strict'

function EntityFactory($rootScope){
	var data = [{
		name: 'Pranav',
		category: 'Name',
		type: 'label-success'
	},{
		name: 'GT',
		category: 'Organization',
		type: 'label-info'
	},{
		name: '2011',
		category: 'Date',
		type: 'label-warning'
	}];
	function getData(){
		return data;
	}

	function addData(n){
		data.push(n);
		// $rootScope.$emit('addHypothesisBox', data);
	}

	var factory = {
		getData: getData,
		addData: addData
	};

	return factory;
}
angular.module('inspinia')
	.factory('EntityFactory', EntityFactory);