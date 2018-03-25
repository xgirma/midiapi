var axios = require('axios');
var baseUrl = process.env.MIDI_API_BASE_URL
var channelsUrl = baseUrl + 'channels'

var getChannels = async function (url) {
  try {
    var response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
  }
}

getChannels(channelsUrl)
  .then(function (data) {
    for (let i = 0; i < data.data.length; i += 1) {
      var feed = data.data[i].feed;
      var url =  baseUrl + 'pods?url=' + feed;
      
      var pullPods = async function(url){
        try {
          var response = await axios.post(url);
          return response.data;
        } catch (error) {
          console.log('error: ', error);
        }
      }

      pullPods(url).then(function(pulled) {
        console.log(pulled);
      });
    }
  })
