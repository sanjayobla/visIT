function evidenceBrowserCtrl($scope) {
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
    $scope.data = [{
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
    }];
}

angular
    .module('inspinia')
    .controller('evidenceBrowserCtrl', evidenceBrowserCtrl);