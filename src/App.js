import React, { Component } from 'react';
import './css/App.css';
import SearchComponent from './SearchComponent';
import PlayerComponent from './PlayerComponent';
import SearchHistoryComponent from './SearchHistoryComponent';


class App extends Component {

constructor(props){
  super(props);

  this.state = {
    selectedTrackID: "",
    searchedTerm: "",
    selectedSearchTerm: ""
  };
};


onSelectedTrack(trackID) {
//console.log("the track id is " + trackID);
this.setState({selectedTrackID: trackID})
}


onSearchedTermSend(newSearchTerm){
  this.setState({searchedTerm: newSearchTerm});
}

onSearchTermClicked(clickedSearchTerm){
  this.setState({selectedSearchTerm: clickedSearchTerm});
}


  render() {
    return (
      <div className="App">

        <SearchComponent
          trackClicked={this.onSelectedTrack.bind(this)}
          getSearchedTerm={this.onSearchedTermSend.bind(this)}
          updateSearch={this.state.selectedSearchTerm}
        />

        <PlayerComponent trackID= {this.state.selectedTrackID}/>

        <SearchHistoryComponent
          newSearchedTerm={this.state.searchedTerm}
          searchTermClicked={this.onSearchTermClicked.bind(this)}
        />

      </div>
    );
  }
}

export default App;
