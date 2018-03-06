# midiapi

mlab: Sandbox databases do not have redundancy and therefore are not suitable for production.

## Blueprint 
```json
{
  "GET /api/v1": {
    "desc": "returns ok",
    "response": "200 application/json",
    "date": {}
  },
  "GET /api/v1/pods": {
    "desc": "returns all podcasts",
    "response": "200 application/json",
    "data": [{},{},{}]
  },
  "GET /api/v1/channels": {
    "desc": "returns all channels",
    "response": "200 application/json",
    "data": [{},{},{}]
  },
  "GET /api/v1/pods/ten/:type": {
    "desc": "returns ten pods by popularity or recency",
    "response": "200 application/json",
    "data": [{},{},{}]
  },
  "GET /api/v1/pods/ten/:title/:type": {
    "desc": "returns ten pods from a single channel by popularity or recency",
    "response": "200 application/json",
    "data": [{},{},{}]
  },
  "PUT /api/v1/pods/:id": {
    "desc": "increment like count of a pod liked by a user",
    "response": "200 application/json",
    "data": {}
  },
  "POST /api/v1/pods": {
    "desc": "add pods",
    "response": "200 application/json",
    "data": {}
  },
  "POST /api/v1/channels": {
    "desc": "add channel",
    "response": "200 application/json",
    "data": {}
  }
}
```

Examples: 

    localhost:3000/api/v1/channels?url=http://feeds.twit.tv/sn_video_hd.xml