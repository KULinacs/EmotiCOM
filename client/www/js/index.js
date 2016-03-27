/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var ToneAnalyzer = {
	"url": "https://gateway.watsonplatform.net/tone-analyzer-beta/api/v3/tone?version=2016-02-11",
    "password": "TFYRJbMsuwUD",
    "username": "f2793151-c1a6-44f4-92d8-a1cb8bf96412"
};

var app = {
    // Application Constructor
    initialize: function() {
		this.faceData = _.mapValues(WatsonToToneEnum, function() {
			// https://lodash.com/docs#mapValues
			return 0; // use the original key, set the value to zero.
		});
		this.toneData = _.mapValues(WatsonToToneEnum, function() {
			// https://lodash.com/docs#mapValues
			return 0; // use the original key, set the value to zero.
		});
	},

	handlePictureSnap: function(imageData) {
	    document.getElementById('camera').setAttribute('src', "data:image/jpeg;base64," + imageData);
	    upload(imageData);
	},

	onFail: function(error) {
		console.log(error);
	},

	pictureSnap: function() {
		navigator.camera.getPicture(app.handlePictureSnap, app.onFail, { quality: 50 });
	},
    
	textToEmotion: function(input, callback) {
		var input = "All our homes are lost our loved ones taken by the sea.";
		$.ajax({
			type: 'POST',
			url: ToneAnalyzer.url,

			contentType: 'application/json',
			data: JSON.stringify({'text': input}),
			username: ToneAnalyzer.username,
			password: ToneAnalyzer.password,
			success: function(data) {
				var tone_categories = data['document_tone']['tone_categories'];
				_.forEach(tone_categories, function(tone_category) {
					if (tone_category['category_id'] === 'emotion_tone') {
						var output = _.map(tone_category['tones'], function(tone_category) {
							var result = {};
							result[WatsonToToneEnum[tone_category['tone_id']]] = tone_category['score'];
							return result;
						});
						callback(output);
						return;
					}
				});
			},
		});
	},

};
