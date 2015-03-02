function searchCtrl($scope){
	$scope.modernBrowsers = [
	    { name: "Anand",              type: "(Person)",        ticked: true  },
	    { name: "GT",  type: "(Location)",             ticked: false },
	    { name: "2011",            type: "(Date)",    ticked: true  },
	    { name: "90212848524",             type: "(Number)",                 ticked: false },
	    { name: "Roger Rabbit",             type: "(Person)",                ticked: true  }
	]; 
}

angular
	.module('inspinia')
	.controller('searchCtrl', searchCtrl);