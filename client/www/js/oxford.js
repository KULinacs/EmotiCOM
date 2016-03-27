var oxfordAPI = '9f3c1b463d4e462aa615b0ceb6a5dd95';
var oxfordURL = 'https://api.projectoxford.ai/emotion/v1.0/recognize';

function getFaceData(imageData, callback) {
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
			faceData = {};
			console.log("0:");
			console.log(data);
			faceData[ToneEnum.ANGER] = data[0]['scores']['anger'];
			faceData[ToneEnum.DISGUST] = data[0]['scores']['disgust'];
			faceData[ToneEnum.FEAR] = data[0]['scores']['fear'];
			faceData[ToneEnum.JOY] = data[0]['scores']['happiness'];
			faceData[ToneEnum.SAD] = data[0]['scores']['sadness'];
			console.log(faceData);
			callback(faceData);
		},
    });
};
