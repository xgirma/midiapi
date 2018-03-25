# Midi Api

    GET     /api/v1/ping

## Channels 

    GET     /api/v1/channels
    POST    /api/v1/channels?url=feedurl
    DELETE  /api/v1/channels?title=channelTitle
    GET     /api/v1/channels/count
    
## Pods

    GET     /api/v1/pods
    POST    /api/v1/pods?url=feedUrl
    PUT     /api/v1/pods?url=feedUrl
    GET     /api/v1/pods/ten/recent
    GET     /api/v1/pods/ten/popular
    GET     /api/v1/pods/ten/recent?title=channelTitle
    GET     /api/v1/pods/ten/popular?title=channelTitle
    PUT     /api/v1/pods/like?id=podId
    GET     /api/v1/pods/count
    DELETE  /api/v1/pods?title=channelTitle
    