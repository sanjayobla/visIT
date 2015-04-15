function evidenceBrowserCtrl($rootScope, $scope, EvidencesFactory) {
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

    function transformEvidence(evidence){
      var temp = {};
      temp.title = evidence.title;
      var groupByCategories =  _.groupBy(evidence.data, function(n) {
                                    return n.category;
                                  });
      groupByCategories = _.pairs(groupByCategories);
      groupByCategories = _.map(groupByCategories, function(d){
          var temp = {};
          temp.title = d[0];
          temp.nodes = [];
          _.forEach(d[1], function(node){
              temp.nodes.push({
                  title: node.name,
                  nodes: []
              })
          })
          return temp;
      });

      temp.nodes = groupByCategories;
      return temp;
    }
    function transformEvidences(){
        var evidences = EvidencesFactory.getData();

        evidences = _.map(evidences, transformEvidence)

        return evidences;

    }

    $rootScope.$on("evidences:retrieveDB", function(event, n){
        $scope.data = transformEvidences();
    });

    $rootScope.$on('evidence:added', function(event, n){
        // console.log(n, transformEvidence(n))
        $scope.data.push(transformEvidence(n));
    })
    $rootScope.$on('evidence:changed', function(event, n){
        // console.log(n);
        _.forEach($scope.data, function(evidence, i){
            if(evidence.title === n.title){
                // console.log(transformEvidence(n))
                // $scope.$apply(function(){
                $scope.data[i] = transformEvidence(n);
                // });
            }
        })
        // $scope.data.push(transformEvidence(n));
    })
    $scope.data = transformEvidences();
    /*$scope.data = [{
        "id": 1,
        "title": "Evidence 1 (1025795.txt)",
        "nodes": [
            {
                "id": 11,
                "title": "Person",
                "nodes": [
                    {
                        "id": 111,
                        "title": "Anand",
                        "nodes": []
                    }
                ]
            },
            {
                "id": 12,
                "title": "Location",
                "nodes": []
            }
        ],
    }, {
        "id": 2,
        "title": "Evidence 2 (172848574.txt)",
        "nodes": [
            {
                "id": 21,
                "title": "Person",
                "nodes": []
            },
            {
                "id": 22,
                "title": "Location",
                "nodes": []
            }
        ],
    }, {
        "id": 3,
        "title": "Evidence 3 (18485904.txt)",
        "nodes": [
            {
                "id": 31,
                "title": "Person",
                "nodes": []
            }
        ],
    }];*/
}

angular
    .module('inspinia')
    .controller('evidenceBrowserCtrl', evidenceBrowserCtrl);