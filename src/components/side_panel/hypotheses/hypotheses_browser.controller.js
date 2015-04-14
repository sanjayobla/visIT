function hypothesesBrowserCtrl($rootScope, $scope, HypothesesFactory) {
    $scope.remove = function(scope) {
        scope.remove();
    };
    $scope.toggle = function(scope) {
        scope.toggle();
    };
    $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0,0, a);
    };
    $scope.newSubItem = function(scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
        });
    };
    $scope.collapseAll = function() {
        $scope.$broadcast('collapseAll');
    };
    $scope.expandAll = function() {
        $scope.$broadcast('expandAll');
    };

    function transformHypothesis(hypothesis){
        var temp = {};
        temp.title = hypothesis.title;
        temp.nodes = [{
            title: 'Positive',
            nodes: _.map(hypothesis.data.positive.data, function(evidence){
                return {
                    title: evidence,
                    nodes: []
                }
            })
        },{
            title: 'Negative',
            nodes: _.map(hypothesis.data.negative.data, function(evidence){
                return {
                    title: evidence,
                    nodes: []
                }
            })
        },{
            title: 'Neutral',
            nodes: _.map(hypothesis.data.neutral.data, function(evidence){
                return {
                    title: evidence,
                    nodes: []
                }
            })
        }]
        return temp;
    }
    function transformHypotheses(){
        var hypotheses = HypothesesFactory.getData();
        console.log(hypotheses);
        hypotheses = _.map(hypotheses, transformHypothesis);
        return hypotheses;
    }

    $rootScope.$on("hypotheses:retrieveDB", function(event, n){
        $scope.data = transformHypotheses();
    });

    // console.log(transformHypotheses());
    $rootScope.$on('hypothesis:added', function(event, n){
        // console.log(n, transformHypothesis(n))
        $scope.data.push(transformHypothesis(n));
    })

    $rootScope.$on('hypothesis:changed', function(event, n){
        // console.log(n);
        _.forEach($scope.data, function(hypothesis, i){
            if(hypothesis.title === n.title){
                // console.log(transformEvidence(n))
                // $scope.$apply(function(){
                $scope.data[i] = transformHypothesis(n);
                // });
            }
        })
        // $scope.data.push(transformEvidence(n));
    })
    $scope.data = transformHypotheses();
    /*$scope.data = [{
        "id": 1,
        "title": "Hypothesis 1",
        "nodes": [
            {
                "id": 11,
                "title": "Evidence 1 (10209484.txt)",
                "nodes": []
            },
            {
                "id": 12,
                "title": "Evidence 2 (18389403.txt)",
                "nodes": []
            }
        ],
    }, {
        "id": 2,
        "title": "Hypothesis 2",
        "nodes": [
            {
                "id": 21,
                "title": "Evidence 3 (183803854.txt)",
                "nodes": []
            },
            {
                "id": 22,
                "title": "Evidence 4 (91382399.txt)",
                "nodes": []
            }
        ],
    }, {
        "id": 3,
        "title": "Hypoethesis 3",
        "nodes": [
            {
                "id": 31,
                "title": "Evidence 5 (216628394.txt)",
                "nodes": []
            }
        ],
    }];*/
}

angular
    .module('inspinia')
    .controller('hypothesesBrowserCtrl', hypothesesBrowserCtrl)