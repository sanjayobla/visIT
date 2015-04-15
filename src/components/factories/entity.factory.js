'user strict'

function EntityFactory($rootScope){
	var data = [/*{
		name: 'Jack Varley',
		category: 'PERSON',
		type: 'PERSON',
		id: 246,
		loc: 0
	},{
		name: 'Eastern Washington',
		category: 'LOCATION',
		type: 'LOCATION',
		id: 245,
		loc: 1
	},{
		name: 'Tuesday',
		category: 'DATE',
		type: 'DATE',
		id: 249,
		loc: 2
	}*/];
	
	function getData(){
		return data;
	}

	function addData(n){
		console.log("Entity node added: ", n);
		data.push(n);
		$rootScope.$emit('entity:added', n);
	}

	$rootScope.$on("appendEntities", function(event, args){
		for(var n in args){
			addData(args[n]);
		}
	});

	var factory = {
		getData: getData,
		addData: addData
	};

	return factory;
}
angular.module('inspinia')
	.factory('EntityFactory', EntityFactory);