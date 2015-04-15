'user strict'

function EvidencesFactory($http, $rootScope){
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

	initFactory();

	function initFactory(){
		return $http.get('/data/get-all-evidences').then(function(response) {
	   		data = response.data;
	   		console.log("responseData", data);
	   		$rootScope.$emit('evidences:retrieveDB', data);
	    });
	}

	function getData(){
		return data;
	}

	$rootScope.$on("appendEvidence", function(event, evidenceNode){
		addData(evidenceNode, function(evidence_id){
			console.log("Inside callbackFN");
			list_entity_ids = [];
			for (var entity_index in evidenceNode.data){
				list_entity_ids.push(evidenceNode.data[entity_index]['id'])
			}

			return $http({
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    	url: '/data/add-entities-to-evidence',
		    	method: "POST",
		    	data: "evidence_id="+evidenceNode.id+"&entities="+JSON.stringify(list_entity_ids)
			})
			.success(function(link_id){
				$rootScope.$emit('evidence:changed', evidenceNode);
			});
		});
	});

	function addData(n, callbackFN){
		return $http({
	    	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    	url: '/data/create-evidence',
	    	method: "POST",
	    	data: "evidence="+n.title,
	    })
        .success(function(evidence_id) {
        	n.id = evidence_id;
        	data.push(n);
        	console.log("Node pushed", n);
        	$rootScope.$emit('evidence:added', n);

        	if(callbackFN){
        		callbackFN(evidence_id);
        	}
        });

		// data.push(n);
		// console.log(n);
		// $rootScope.$emit('evidence:added', n);
	}

	function addEntityTo(evidence, entity){
		console.log("Adding ", entity," to ", evidence);
		_.forEach(data, function(datum){
			if(evidence.title === datum.title){
				// console.log(_.some(datum.data, 'name', entity.name), datum, entity);
				if(_.some(datum.data, 'name', entity.name)) return;

				return $http({
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    	url: '/data/add-entity-to-evidence',
			    	method: "POST",
			    	data: "evidence_id="+evidence.id+"&entity_id="+entity.id
				})
				.success(function(link_id){
					datum.data.push(entity);
					datum.count++;
					$rootScope.$emit('evidence:changed', datum);
				});

				// datum.data.push(entity);
				// datum.count++;
				// // console.log(datum);
				// $rootScope.$emit('evidence:changed', datum);
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