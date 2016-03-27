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
    initialize: function() {
		app.faceData = {};
		app.toneData = {};
		_.forIn(ToneEnum, function(val, key) {
			app.faceData[val] = 0;
			app.toneData[val] = 0;
		});
	},

	handlePictureSnap: function(imageData) {
	    document.getElementById('camera').setAttribute('src', "data:image/jpeg;base64," + imageData);
		getFaceData(imageData, function(faceData) {
			app.faceData = faceData;
			app.updateEmotion();
		})
	},

	onFail: function(error) {
		console.log(error);
	},

	pictureSnap: function() {
		navigator.camera.getPicture(app.handlePictureSnap, app.onFail, { quality: 50 });
	},
	
	changeColor: function(emotion) {
		var headerColor;
		var contentColor;
		var textColor;
		if (ToneEnum.ANGER === emotion) {
    		headerColor = "#d32f2f";
    		contentColor = "#ffebee";
			textColor = "#212121";
			buttonColor = "#ff8a80";
		} else if (ToneEnum.DISGUST === emotion) {
			headerColor = "#388e3c";
    		contentColor = "#e8f5e9";
			textColor = "#616161";
			buttonColor = "#b9f6ca";
		} else if (ToneEnum.FEAR === emotion) {
			headerColor = "#7b1fa2";
    		contentColor = "#f3e5f5";
			textColor = "#9e9e9e";
			buttonColor = "#ea80fc";
		} else if (ToneEnum.JOY === emotion) {
			headerColor = "#fbc02d";
    		contentColor = "#fffde7";
			textColor = "#424242";
			buttonColor = "#ffff8d";
		} else {
			headerColor = "#1976d2";
    		contentColor = "#e3f2fd";
			textColor = "#212121";
			buttonColor = "#82b1ff";
		}
		$('.collapsible-header').css({backgroundColor: headerColor});
		$('.collapsible-body').css({backgroundColor: contentColor});
		$('.material-icons').css({color: textColor});
		$('manual-input-button').css({color: buttonColor});
		$('p').css({color: textColor, textShadow: "none"});
        $('i').css({textShadow: "none"});
	},

	updateEmotion: function() {
		var overall = _.mapKeys(WatsonToToneEnum, function(key) {
			return app.faceData[key] + app.toneData[key];
		});
		overall = _.toPairs(overall);
		var emotion = _.maxBy(overall, function(pair){ return Number(pair[0]); })[1];
		$('#emotions-output').text(ToneToString[emotion]);
        app.changeColor(emotion);
        app.changeMusic(emotion);
    },

    changeMusic: function(currentEmote) {
        if (currentEmote === ToneEnum.ANGER) {
            $('#music').html('<iframe width="100%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/209882281&amp;color=ff5500&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false"></iframe>');
        } else if (currentEmote === ToneEnum.DISGUST) {
            $('#music').html('<iframe width="100%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/209882063&amp;color=ff5500&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false"></iframe>');
        } else if (currentEmote === ToneEnum.FEAR) {
            $('#music').html('<iframe width="100%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/209880966&amp;color=ff5500&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false"></iframe>');
        } else if (currentEmote === ToneEnum.JOY) {
            $('#music').html('<iframe width="100%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/209881431&amp;color=ff5500&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false"></iframe>');
        } else if (currentEmote === ToneEnum.SAD) {
            $('#music').html('<iframe width="100%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/209882561&amp;color=ff5500&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false"></iframe>');
        }



    }
};
