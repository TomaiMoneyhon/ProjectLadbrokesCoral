
//import axios from 'axios';


export const soundcloudTracksURL = "https://api.soundcloud.com/tracks/";
export const soundcloudClientID = "ggX0UomnLs0VmW7qZnCzw";

/*export const searchTracks = (query,OS,recievedResults => {

  axios.get(soundcloudURL, {
    params: {
        client_id: clientID,
        limit: 6,
        offset: OS,//multiplies of 6
       q: query
    }
  }).then(res => {
    //this is how you access one track
    //console.log(res.data[0].title);
    console.log(res.data);
    return recievedResults(res);


    //this.setState({searchResults: res.data});
    //console.log(this.state.searchResults);
  }).catch(error => {
    console.log(error);
  });

})*/


/*class SoundcloudAPI {

  constructor() {

};


  searchTracks(query) {
    axios.get(this.soundcloudURL, {
      params: {
          client_id: this.clientID,
          limit: 6,
          //offset: multiplies of 6
         q: query
      }
    }).then(res => {
      //this is how you access one track
      //console.log(res.data[0].title);
      console.log(res);

      //this.setState({searchResults: res.data});
      //console.log(this.state.searchResults);
    }).catch(error => {
      console.log(error);
    });

  };
};

export default SoundcloudAPI;*/
