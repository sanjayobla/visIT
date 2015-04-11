angular.module('inspinia')
	.factory('ListDataFactory',function($rootScope, ListAPIService){

		var listMode;
		var listContents = [];
		var listEntityTypes = [];
		var selectedLists = [];
		var currentlyDisplayedLists = [];

		var currentSelection = "#FEF935";
		var seedSelectionColorSwatch = ["#ffdc8c", '#ffd278','#ffc864','#ffbe50','#ffb43c','#ffaa28','#ffa014','#ff9600'];

		var service = {};

		service.init = function(defaultMode){
			listMode = defaultMode;
			ListAPIService.fetchListContents()
				.then(function(data){
					listContents = data;
					ListAPIService.fetchEntityTypes()
					.then(function(data){
						listEntityTypes = data;
						$rootScope.$broadcast('entityTypesLoaded');
					});
				});
		}

		//Returns the list contents
		service.getListContents = function(listName){
			for(var index=0; index<listContents.length; index++){
				if(listContents[index].key === listName){
					if(currentlyDisplayedLists.indexOf(listName) == -1){
						currentlyDisplayedLists.push(listName);
					}
					return listContents[index].values;
				}
			}
			return [];
		}

		//Returns the list of entity headers
		service.getListEntityTypes = function(){
			return listEntityTypes;
		}

		service.setSelectedListItem = function(listName, selectedListItems){
			var index = findInList(listName, selectedLists, 'column');

			// console.log("Pushing value: "+ selectedListItems+" in list "+ listName);
			// console.log("SelectedListItems.length: "+ selectedListItems.length);
			var params = { 'column' : listName, 'values' : selectedListItems };

			if(index != -1){
				if(selectedListItems.length){
					// console.log("Updating params");
					selectedLists[index] = params;	
				}else{
					// console.log("Removing params");
					selectedLists.splice(index, 1);
				}
			}else{
				if(selectedListItems.length){
					selectedLists.push(params);
				}
			}

			console.log("SelectedLists", selectedLists);
			updateListContents();
		}

		/** Private functions **/

		function findInList(needle, hayStack, attributeName){
			for(var index=0; index<hayStack.length; index++){
				if(hayStack[index][attributeName] === needle){
					return index;
				}
			}
			return -1;
		}

		function resetStrengthData(){
			//Reset the data here..
			for(var listIndex=0; listIndex<listContents.length; listIndex++){
				var list = listContents[listIndex]['values'];
				for(var itemIndex=0; itemIndex<list.length; itemIndex++){
					list[itemIndex]['strength'] = 0;
					list[itemIndex]['hasStrength'] = 0;
					list[itemIndex]['strengthCount'] = 0;
					list[itemIndex]['background'] = "#FFFFFF";
				}
			}
		}

		function updateListContents(){
			if(selectedLists.length){
				ListAPIService.getUpdatedListContents({'mode':listMode, 'params': selectedLists, 'column_list': currentlyDisplayedLists})
				.then(function(data){
					resetStrengthData();
					var listIndex, listContent, itemIndex;
					var strength;
					for(var index=0; index<data.length; index++){

						listIndex = findInList(data[index]['key'], listContents, 'key');
						listContent = data[index]['values'];
						
						for(var sub_index=0; sub_index<listContent.length; sub_index++){
							itemIndex = findInList(listContent[sub_index]['name'], listContents[listIndex]['values'], 'name');
							if(itemIndex != -1){
								listContents[listIndex]['values'][itemIndex]['strength'] = listContent[sub_index]['strength'];
								listContents[listIndex]['values'][itemIndex]['hasStrength']	= 1;
								listContents[listIndex]['values'][itemIndex]['strengthCount'] = listContent[sub_index]['count'];
								strength_count = (listContent[sub_index]['count'] > 8)? 8: listContent[sub_index]['count'];
								listContents[listIndex]['values'][itemIndex]['background'] = seedSelectionColorSwatch[strength_count-1];
							}
						}
					}

					var listIndex, itemIndex;
					selectedLists.map(function(params){
						listIndex = findInList(params.column, listContents, 'key');

						params.values.map(function(itemName){
							itemIndex = findInList(itemName, listContents[listIndex]['values'],'name');
							if(itemIndex != -1){
								listContents[listIndex]['values'][itemIndex]['background'] = currentSelection;
								listContents[listIndex]['values'][itemIndex]['hasStrength'] = 0;
								listContents[listIndex]['values'][itemIndex]['strength'] = 9999;
							}
						});
					});
					$rootScope.$broadcast('loadComplete');
				});
			} else {
				resetStrengthData();
				$rootScope.$broadcast('loadComplete');
			}
		}

		return service;

	});