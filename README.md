# midiapi

mlab: Sandbox databases do not have redundancy and therefore are not suitable for production.

## Blueprint 
```json
{
  "GET /api/v1/ping": {
    "desc": "returns pong",
    "response": "200 application/json",
    "data": {}
  },
  "GET /api/v1/pods": {
    "desc": "returns all podcasts",
    "response": "200 application/json",
    "data": [
      {},
      {},
      {}
    ]
  },
  "GET /api/v1/channels": {
    "desc": "returns all channels",
    "response": "200 application/json",
    "data": [
      {},
      {},
      {}
    ]
  },
  "GET /api/v1/pods/like?id=id": {
    "desc": "increment like by one and return updated pod",
    "response": "200 application/json",
    "data": {}
  },
  "GET /api/v1/pods/ten/popular": {
    "desc": "returns ten pods by popular pods of all time and channel",
    "response": "200 application/json",
    "data": [
      {},
      {},
      {}
    ]
  },
  "GET /api/v1/pods/ten/recent": {
    "desc": "returns ten recent pods of all time and channel",
    "response": "200 application/json",
    "data": [
      {},
      {},
      {}
    ]
  },
  "GET /api/v1/pods/ten/:title/:type": {
    "desc": "returns ten pods from a single channel by popularity or recency",
    "response": "200 application/json",
    "data": [
      {},
      {},
      {}
    ]
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
    "desc": "add a channel",
    "response": "200 application/json",
    "data": {}
  }
}
```

Examples: 

    localhost:3000/api/v1/channels?url=https://feed.syntax.fm/rss
    localhost:3000/api/v1/pods?url=https://feed.syntax.fm/rss