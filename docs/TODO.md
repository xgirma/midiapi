# TODO

## Investigate feeds that can not be parsed

```json
{
	"javascriptAir": "http://audio.javascriptair.com/feed/",
	"shopTalkShow": "http://shoptalkshow.com/feed/podcast/",
	"codeNewbie": "http://feeds.codenewbie.org/cnpodcast.xml",
	"fullStackJavascriptPodcast": "http://fullstackjavascriptpodcast.com/feed/podcast/"
}
```

## Test
- if new episode_title are added, insertMany issue
 
- verify if there is any video media, if not use only an audio player

- investigate best way for error handling: good example if a post is a dup, what kind of error should be logged: what status message should be send 

- make sure heroku config:set NODE_ENV="production" is set, by checking the response for badRequest, if not set it.

