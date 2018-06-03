import React from 'react';
import './css/SearchHistoryComponent.css'

class SearchHistoryComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchHistory:[],
      clickedSearchTerm: ""
    };
  }


componentDidUpdate(prevProps, prevState) {
  if (prevProps.newSearchedTerm !== this.props.newSearchedTerm) {
    if(this.state.searchHistory.length<6){
    this.setState({searchHistory: [...this.state.searchHistory,this.props.newSearchedTerm]});
  }else{
    var clippedSearchHistory = this.state.searchHistory;
    clippedSearchHistory.splice(0,1);
    clippedSearchHistory = [...clippedSearchHistory, this.props.newSearchedTerm];
    this.setState({searchHistory: clippedSearchHistory});
  };

  };
}


handleClickedSearch(e){
  this.setState(
    {clickedSearchTerm: e.target.id},
    () => this.props.searchTermClicked(this.state.clickedSearchTerm)
  );
}

  render() {
    return(
      <div className="search-history-container">
        <h1>Search History</h1>
        <ul className="search-history-list">
          {this.state.searchHistory.map(
            result =>
            <li
              className= "search-history-item"
              id={result}
              key={result}
              onClick = {this.handleClickedSearch.bind(this)}
            >
              {result}
            </li>

          )}
        </ul>
      </div>
    );
  }
}

export default SearchHistoryComponent;
