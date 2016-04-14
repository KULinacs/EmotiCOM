var ToneAnalyzer = {
	"url": "https://gateway.watsonplatform.net/tone-analyzer-beta/api/v3/tone?version=2016-02-11",
    "password": "",
    "username": ""
};

function getToneData(textData, callback) {
	var input = "All our homes are lost our loved ones taken by the sea.";
	$.ajax({
		type: 'POST',
		url: ToneAnalyzer.url,
		contentType: 'application/json',
		data: JSON.stringify({'text': textData}),
		username: ToneAnalyzer.username,
		password: ToneAnalyzer.password,
		success: function(data) {
			var tone_categories = data['document_tone']['tone_categories'];
			_.forEach(tone_categories, function(tone_category) {
				if (tone_category['category_id'] === 'emotion_tone') {
					var result = {}
					_.forEach(tone_category['tones'], function(tone_category) {
						result[WatsonToToneEnum[tone_category['tone_id']]] = tone_category['score'];
					});
					callback(result);
					return;
				}
			});
		},
	});
}
