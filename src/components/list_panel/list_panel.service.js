angular.module('inspinia')
	.service('ListAPIService', function($http, $q){
		
		var url_prefix = "http://127.0.0.1:5000";

		return ({
			fetchListContents: fetchListContents,
			fetchEntityTypes: fetchEntityTypes,
			getUpdatedListContents: getUpdatedListContents
		});

		/** Public methods **/

		//Saves all the entity types that are displayed in the list view
		function fetchEntityTypes(){
			var request = $http({
				method: "get",
				url: url_prefix + "/list/get-list-entity-types"
			});

			return(request.then(function(response){
				return response.data;
			}, handleError));
		}

		//Saves all the list contents to be stored in the Angular Model.
		function fetchListContents(){
			var request = $http({
				method: "get",
				url: url_prefix + "/list/get-list-contents"
			});

			return( request.then(function(response){
				return response.data;
			}, handleError) );
		}

		function getUpdatedListContents(params){
			var request = $http({
				url: url_prefix + "/list/get-updated-list-contents",
				method: "POST",
        		data: JSON.stringify(params),
        		headers: {'Content-Type': 'application/json'}
			});

			return (request.then(function(response){
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