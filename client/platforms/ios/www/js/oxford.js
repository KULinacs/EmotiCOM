var oxfordAPI = '9f3c1b463d4e462aa615b0ceb6a5dd95';
var oxfordURL = 'https://api.projectoxford.ai/emotion/v1.0/recognize';

function upload(imageData) {
    // Image Data should be a Base64 encoded string
    var imageDecode = atob(imageData);
    var byteCount = imageDecode.length;
    var bytesArray = new Uint8Array(byteCount);
    for (var i = 0, l = byteCount; i < l; i++) {
	bytesArray[i] = imageDecode.charCodeAt(i);
    }
    $.ajax({
	url: oxfordURL,
	type: 'POST',
	contentType: 'application/octet-stream',
	data: bytesArray,
	processData: false,
	headers: {
	    'Ocp-Apim-Subscription-Key': oxfordAPI,
	},
	dataType: 'json',
	success: function (data) {
	    alert(data[0]['scores']['anger']);
	    var maxString = 'anger';
	    var maxEnum = ToneEnum.ANGER;
	    if (data[0]['scores'][maxString] < data[0]['scores']['disgust']) {
		maxString = 'disgust';
		maxEnum = ToneEnum.DISGUST;
	    }
	    if (data[0]['scores'][maxString] < data[0]['scores']['fear']) {
		maxString = 'fear';
		maxEnum = ToneEnum.FEAR;
	    }
	    if (data[0]['scores'][maxString] < data[0]['scores']['happiness']) {
		maxString = 'happiness';
		maxEnum = ToneEnum.JOY;
	    }
	    if (data[0]['scores'][maxString] < data[0]['scores']['sadness']) {
		maxString = 'sadness';
		maxEnum = ToneEnum.SAD;
	    }
	    alert(maxEnum);
	},
    });
};
