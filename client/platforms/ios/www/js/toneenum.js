const ToneEnum = {
    ANGER : 0,
    DISGUST : 1,
    FEAR : 2,
    JOY : 3,
    SAD : 4,
}

const WatsonToToneEnum = {
	'anger': ToneEnum.ANGER,
	'disgust': ToneEnum.DISGUST,
	'fear': ToneEnum.FEAR,
	'joy': ToneEnum.JOY,
	'sadness': ToneEnum.SAD,
};

const ToneToString = {
	// you are feeling ________
	0: 'angry and volatile!!',
	1: 'disgusted and appaled.',
	2: 'timid and fearful...',
	3: 'joyful and happy!',
	4: 'sad and wistful...',
}
