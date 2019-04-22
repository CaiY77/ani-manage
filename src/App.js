import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import SearchBar from './components/SearchBar.js'
import Bookmark from './components/Bookmark.js'
import SearchResult from './components/SearchResult.js'
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      genre: "",
      searchResults: []
    };
  }

  searchHandle = (event) => {
    this.setState({searchVal: event.target.value});
  }

  genreHandle=(event)=>{
    this.setState({
      genre: event
    });
  }

  fetchSearched = (event) => {
    let url = `https://api.jikan.moe/v3/search/anime?q=${this.state.searchVal}&page=1`
    axios.get(url)
    .then(response => response.data.results)
    .then(data => {
      this.setState({
        searchResults: data
      });
    })
  }

  fetchGenre=(event)=>{
    console.log("genre search");
  }





  render() {
    const {searchVal,byGenre,searchResults} = this.state;
    return (<div>
      <nav className="ui massive fluid two item menu">
        <Link to="/" className="item link-style">Find My Anime</Link>
        <Link to="/bookmark" className="item link-style">My Bookmarks</Link>
      </nav>

      <SearchBar
        searchHandle={this.searchHandle}
        fetchSearched={this.fetchSearched}
        genreHandle={this.genreHandle}
        fetchGenre={this.fetchGenre}
      />

      <main>
        <Route exact path="/"
          render={ ()=><SearchResult searchResults={searchResults}/> }
        />
        <Route path="/bookmark" component={Bookmark}/>
      </main>
    </div>);
  }
}

export default App;
