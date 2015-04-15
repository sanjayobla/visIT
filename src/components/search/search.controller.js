function searchCtrl($rootScope, $scope, HypothesesFactory, EntityFactory, EvidencesFactory){
	var hypotheses = [];
	var evidences = [];
	var entities = [];
	function createGrouping(){
		var temp = [];
		temp.push(
			 { title: 'Hypotheses', achGroup: true }
		);
		_.forEach(hypotheses, function(hypothesis){
			temp.push(hypothesis);
		});
		temp.push(
			 { achGroup: false }
		);
		temp.push(
			 { title: 'Evidences', achGroup: true }
		);
		_.forEach(evidences, function(evidence){
			temp.push(evidence);
		});
		temp.push(
			 { achGroup: false }
		);
		return temp;
	}

	$rootScope.$on('hypotheses:retrieveDB', function(event, args){
		hypotheses = [];
		_.forEach(args, function(hypothesis){
			var temp = _.pick(hypothesis, 'title');
			temp.type = '(Hypothesis)';
			temp.ticked = false;
			hypotheses.push(temp);
		});
		$scope.achGroups = createGrouping();
	})

	$rootScope.$on('hypothesis:added', function(event, args){
		var temp = _.pick(args, 'title');
		temp.type = '(Hypothesis)';
		temp.ticked = false;
		hypotheses.push(temp);
		$scope.achGroups = createGrouping();
	});
	$rootScope.$on('evidence:added', function(event, args){
		var temp = _.pick(args, 'title');
		temp.type = '(Evidence)';
		temp.ticked = false;
		evidences.push(temp);
		$scope.achGroups = createGrouping();
	});
	
	$scope.achGroups = [];

	$scope.fOpen = function() {
	    console.log( 'On-open' );
	}

	$scope.fClose = function() {
	    console.log( 'On-close' );
	    // console.log(hypotheses);
	}    

	$scope.fClick = function( data ) {           
	    console.log( 'On-item-click' );        
	    console.log( 'On-item-click - data:' );        
	    // console.log( data, $scope.achResults );
	    $rootScope.$emit('globalSearch:active',$scope.achResults);
	}    

	$scope.fSelectAll = function() {
	    console.log( 'On-select-all' );
	    $rootScope.$emit('globalSearch:active',$scope.achResults);
	}

	$scope.fSelectNone = function() {
	    console.log( 'On-select-none' );
	    $rootScope.$emit('globalSearch:active',[]);
	}

	$scope.fReset = function() {
	    console.log( 'On-reset' );
	    $rootScope.$emit('globalSearch:active',[]);
	}        

	$scope.fClear = function() {
	    console.log( 'On-clear' );
	    $rootScope.$emit('globalSearch:active',$scope.achResults);
	}

	$scope.fSearchChange = function( data ) {
	    console.log( 'On-search-change' );
	    console.log( 'On-search-change - keyword: ' + data.keyword );
	    console.log( 'On-search-change - result: ' );
	    console.log( data.result );
	}
}

angular
	.module('inspinia')
	.controller('searchCtrl', searchCtrl);