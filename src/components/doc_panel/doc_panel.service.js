

angular.module('inspinia')
	.service('DocumentAPIService', function($http, $q){

		var url_prefix = "http://127.0.0.1:5000"

		//Below is a list of the publically accessible APIs from the service
		return ({
			fetchDocumentList: fetchDocumentList,
			fetchDocumentContent: fetchDocumentContent
		});

		/** Public Methods **/

		//Fetches a list of all the documents that can be shown in the document view.
		function fetchDocumentList(){
			var request = $http({
				method: "get",
				url: url_prefix + "/data/get-document-list"
			});

			return(request.then(function(response){
				return response.data;
			}, handleError));
		}

		//Gets the content of a document identified by a unique document ID
		function fetchDocumentContent(documentID){
			var request = $http({
				method: "get",
				url: url_prefix + "/data/get-document/"+documentID
			});

			return(request.then(function(response){
				return response.data;
			}, handleError));
		}

		/** Private methods **/

		function handleError(response){
			// The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
                ) {

                return( $q.reject( "An unknown error occurred." ) );

            }

            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );
		}
	});