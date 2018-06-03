import React from 'react';
import './css/SearchComponent.css';
import axios from 'axios';
import {soundcloudTracksURL, soundcloudClientID} from "./SoundcloudAPI"

class SearchComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchResults: [],
      nextBTNIsHidden: true,
      offset: 0
    };
  }


  handleSearchChange(e){
    this.setState({searchTerm: e.target.value});
  }


  searchBTN() {

    if(this.state.searchTerm !== ""){
      //This makes the 'next' button appear
      if (this.state.nextBTNIsHidden) {
        this.setState({nextBTNIsHidden: false});
      }

      this.setState(
        {offset: 0},
        () => this.searchAPI()
      );
      this.props.getSearchedTerm(this.state.searchTerm);
    }
  }


  nextBTN() {
     var newOffset = this.state.offset + 6;
      this.setState(
        {offset: newOffset},
        () => this.searchAPI()
      );
  }


  searchAPI() {

    axios.get(soundcloudTracksURL, {
      params: {
          client_id: soundcloudClientID,
          limit: 6,
          offset: this.state.offset,
          q: this.state.searchTerm
      }
    }).then(res => {
      //this is how you access one track
      //res.data[0];
      //give an array of tracks
      //console.log(res);
      this.setState({searchResults: res.data});
    }).catch(error => {
      console.log(error);
    });
  }


  handleClickedTrack(e){
    this.setState(
      {clickedTrackID: e.target.id},
      () => this.props.trackClicked(this.state.clickedTrackID)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.updateSearch !== this.props.updateSearch) {
      //console.log("search changed" + this.props.updateSearch);
      this.setState(
        {searchTerm: this.props.updateSearch},
        () => this.searchAPI()
      );
    }
  }


  render() {
      return (
          <div className= "search-container">

            <input
              type="text"
              className= "search-text-input"
              onChange={this.handleSearchChange.bind(this)}
            />

            <input
              type="submit"
              className= "search-submit"
              value="Search"
              onClick={this.searchBTN.bind(this)}
            />

            <ul className="search-result-list">
                {this.state.searchResults.map(
                  result =>
                    <li
                      className = "search-result-item"
                      onClick={this.handleClickedTrack.bind(this)}
                      key= {result.id}
                      id= {result.id}
                    >
                      {result.title}
                    </li>
                )}
            </ul>

            <input
              type="button"
              onClick={this.nextBTN.bind(this)}
              value="Next"
              style= {this.state.nextBTNIsHidden ? {display: 'none'} : {}}
            />

          </div>
      );
  }
}

export default SearchComponent;
