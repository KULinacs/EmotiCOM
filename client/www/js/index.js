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
var app = {
    // Application Constructor
    initialize: function() { },

	handlePictureSnap: function(imageData) {
		document.getElementById('camera').setAttribute('src', "data:image/jpeg;base64," + imageData);
	},

	onFail: function(error) {
		console.log(error);
	},

	pictureSnap: function() {
		navigator.camera.getPicture(app.handlePictureSnap, app.onFail, { quality: 50 });
	},
	
	changeColor: function() {
		var headerColor;
		var contentColor;
		var textColor;
		if (ToneEnum.ANGER) {
    		headerColor = "#d32f2f";
    		contentColor = "#ffebee";
			textColor = "#212121";
		} else if (ToneEnum.DISGUST) {
			headerColor = "#388e3c";
    		contentColor = "#e8f5e9";
			textColor = "#616161";
		} else if (ToneEnum.FEAR) {
			headerColor = "#7b1fa2";
    		contentColor = "#f3e5f5";
			textColor = "#9e9e9e";
		} else if (ToneEnum.JOY) {
			headerColor = "#fbc02d";
    		contentColor = "#fffde7";
			textColor = "#424242";
		} else {
			headerColor = "#1976d2";
    		contentColor = "#e3f2fd";
			textColor = "#212121";
		}
		$('.collapsible-header').css({backgroundColor: headerColor});
		$('.collapsible-body').css({backgroundColor: contentColor});
		$('.material-icons').css({backgroundColor: textColor});
		$('p').css({backgroundColor: textColor});
// 		$('#social-media').css({backgroundColor: headerColor});
// 		$('#manual-input').css({backgroundColor: headerColor});
// 		$('#settings').css({backgroundColor: headerColor});
// 		$('#social-media-body').css({backgroundColor: contentColor});
// 		$('#manual-input-body').css({backgroundColor: contentColor});
// 		$('#settings-body').css({backgroundColor: contentColor});
// 		$('#social-media-text').css({backgroundColor: textColor});
// 		$('#manual-input-text').css({backgroundColor: textColor});
// 		$('#settings-text').css({backgroundColor: textColor});
		
		
	},
    
};
