import requests
from requests.structures import CaseInsensitiveDict
import json

credentials = {
    "url": "https://gateway.watsonplatform.net/tone-analyzer-beta/api/v3/tone",
    "password": "TFYRJbMsuwUD",
    "username": "f2793151-c1a6-44f4-92d8-a1cb8bf96412",
    "version": "2016-02-11",
}

def get(text):
    a = dict(
        method='post',
        url=credentials['url'],
        auth=(credentials['username'], credentials['password']),
        headers=CaseInsensitiveDict({'Content-Type': 'application/json', 'Accept': 'application/json'}),
        params={'version': credentials['version']},
        data=json.dumps({'text': text}),
    )
    res = requests.request(**a)

    if 200 <= res.status_code <= 299:
        return json.loads(res.text)
    else:
        raise RuntimeError('API error')

def filtered_get(text):
    res = get(text)
    for tone_category in res['document_tone']['tone_categories']:
        if tone_category['category_id'] == 'emotion_tone':
            return max(tone_category['tones'], key=lambda tone: int(tone['score']))['tone_name']

if __name__ == '__main__':
    # testing
    print(filtered_get(
        "y'all are dipshits. I'm giving up on you. I am just disappointed in us."
        # - the Illustrious Nicklaus McFuckYourselfClendon
    ))
