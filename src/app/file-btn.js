$(function(){
	$(document).on('change', '.btn-file :file', function() {
		var input = $(this);
		console.log(input);
		numFiles = input.get(0).files ? input.get(0).files.length : 1,
		label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

		var labelObject = $(this).parents('.input-group').find(':text');
		console.log(labelObject);
		log = numFiles > 1 ? numFiles + ' files selected' : label;

		if( labelObject.length ) {
			labelObject.val(log);
		} else {
			if( log ) alert(log);
		}
	});

	// $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
	// 	console.log("fileselect");
	// 	var input = $(this).parents('.input-group').find(':text'),
	// 	log = numFiles > 1 ? numFiles + ' files selected' : label;

	// 	if( input.length ) {
	// 		input.val(log);
	// 	} else {
	// 		if( log ) alert(log);
	// 	}
	// });
});