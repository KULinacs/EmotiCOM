var oxfordAPI = '9f3c1b463d4e462aa615b0ceb6a5dd95';
var oxfordURL = 'https://api.projectoxford.ai/emotion/v1.0/recognize';

function upload(imageData) {
    var uploadData = atob(imageData);
    $.ajax({
	url: oxfordURL,
	type: 'post',
	data: {
	    uploadData,
	},
	headers: {
	    Ocp-Apim-Subscription-Key: oxfordAPI,
	},
	dataType: 'octet-stream',
	success: function (data) {
	    console.log(data);
	}
    });
};
