'user strict'

function EvidencesFactory($rootScope){
	var data = [
		/*{
			title:'Evidence 1 (110203.txt)',
			count: 3,
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
		}*/
	];
	function getData(){
		return data;
	}

	function addData(n){
		data.push(n);
		$rootScope.$emit('evidence:added', n);
	}

	function addEntityTo(evidence, entity){
		_.forEach(data, function(datum){
			if(evidence.title === datum.title){
				// console.log(_.some(datum.data, 'name', entity.name), datum, entity);
				if(_.some(datum.data, 'name', entity.name)) return;
				datum.data.push(entity);
				datum.count++;
				// console.log(datum);
				$rootScope.$emit('evidence:changed', datum);
				return;
			}
		})
	}

	var factory = {
		getData: getData,
		addData: addData,
		addEntityTo: addEntityTo
	};

	return factory;
}
angular.module('inspinia')
	.factory('EvidencesFactory', EvidencesFactory);