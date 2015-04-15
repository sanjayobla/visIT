'user strict'

function NotificationsFactory($rootScope){
	var data = [/*{
		title: 'Hypothesis 1',
		threshold: 5,
	}*/];
	
	$rootScope.$on('hypothesis:changed', function(event, hypothesis){
		console.log('notifications', hypothesis)
		if(hypothesis.count === hypothesis.threshold){
			addData({
				title: hypothesis.title,
				threshold: hypothesis.threshold
			})
		}
	})

	function getData(){
		return data.reverse();
	}

	function addData(n){
		// console.log("Entity node added: ", n);
		data.push(n);
		$rootScope.$emit('notification:added', n);
	}

	function removeAt(index){
		data.splice(index, 1);
		console.log('notifications', data);
	}

	var factory = {
		getData: getData,
		addData: addData,
		removeAt: removeAt
	};

	return factory;
}
angular.module('inspinia')
	.factory('NotificationsFactory', NotificationsFactory);