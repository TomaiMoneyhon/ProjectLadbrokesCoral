import React from 'react';
import axios from 'axios';
import './css/PlayerComponent.css';
import SoundcloudWidget from 'soundcloud-widget';
import KeepCalm from './Keep_Calm.jpg';
import picNotFound from './Pic_Not_Found.jpg';
import {soundcloudTracksURL, soundcloudClientID} from "./SoundcloudAPI";

const showClass = "show";
const hideClass = "hide";
const iframeID = "the-iframe";

class PlayerComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTrack: {},
      soundCloudEmbedIsHidden: true,
      currentImage: KeepCalm,
      SoundcloudEmbedSRC: "",
      widget : "",
      isImageOpacityClass: showClass,
    };
  }


  getTrackAPI() {

    const soundcloudCurrentTrackURL = soundcloudTracksURL + this.props.trackID;

    axios.get(soundcloudCurrentTrackURL, {
      params: {
        client_id: soundcloudClientID
      }
    }).then(res => {

      this.setState({currentTrack: res.data});
      var defaultImage = this.state.currentTrack.artwork_url;
      var regExp = /large/;
      if (defaultImage !== null){
        defaultImage =  defaultImage.replace(regExp,'t500x500');
      }else{
          defaultImage = picNotFound;
      }

      setTimeout(
        function() {
          this.setState({currentImage: defaultImage});
          this.setState({isImageOpacityClass: showClass})
        }.bind(this),
        400
      );
    })

  }


  componentDidUpdate(prevProps, prevState) {

    if (prevProps.trackID !== this.props.trackID) {

    if (prevProps.trackID !== "") {
      var currentWidget = this.state.widget;
      if (!this.state.soundCloudEmbedIsHidden){
        currentWidget.pause();
      }
    }
      this.setState({isImageOpacityClass: hideClass},
    () => this.getTrackAPI())

      this.setState({
        soundCloudEmbedIsHidden: true
      });
    };
  }


  componentDidMount() {
    var soundcloudNewWidget =  new SoundcloudWidget(iframeID);
    this.setState({widget: soundcloudNewWidget});
  }


  handleClickedImage() {
    this.setState({
      soundCloudEmbedIsHidden: false
    });
    this.setState({
      SoundcloudEmbedSRC: "https://w.soundcloud.com/player/?url=" + this.state.currentTrack.uri + "&auto_play=true"
    });
  }


  render() {

    return(
      <div  className= "player-container">

            <img
              onClick={this.handleClickedImage.bind(this)}
              className={"track-image " + this.state.isImageOpacityClass}
              src={this.state.currentImage}
              alt=""
            />

            <iframe
              style= {this.state.soundCloudEmbedIsHidden ? {display: 'none'} : {display: ''}}
              id={iframeID}
              className="soundcloud-iframe"
              title="soundcloud-embed"
              scrolling="no"
              frameBorder="no"
              src={this.state.SoundcloudEmbedSRC}
            ></iframe>

      </div>
    );
  }
}

export default PlayerComponent;
