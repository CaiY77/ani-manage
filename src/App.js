import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'
import SearchBar from './components/SearchBar.js'
import Bookmark from './components/Bookmark.js'
import SearchResult from './components/SearchResult.js'
import MangaPage from './components/MangaPage.js'
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      genre: '',
      searchResults: [],
      mangaResults: [],
      inBookmark: null,
      favorites: JSON.parse(window.localStorage.getItem('favorites')) || []
    };
  }

  componentDidMount() {
   document.title = 'Ani-Manage';
 }

  searchHandle = (event) => {
    this.setState({
      searchVal: event.target.value
    });
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

    this.fetchManga();
  }

  fetchManga = () => {
    let url = `https://api.jikan.moe/v3/search/manga?q=${this.state.searchVal}&page=1`
    axios.get(url)
    .then(response => response.data.results)
    .then(data => {
      this.setState({
        mangaResults: data
      });
    })
  }

  fetchGenre=()=>{
    let url = `https://api.jikan.moe/v3/genre/anime/${this.state.genre}/1`
    axios.get(url)
    .then(response => response.data.anime)
    .then(data=>{
      this.setState({
        searchResults: data
      });
    })
    this.fetchGenreManga();
  }

  fetchGenreManga =() => {
    console.log("hello")
    let url = `https://api.jikan.moe/v3/genre/manga/${this.state.genre}/1`
    axios.get(url)
    .then(response => response.data.manga)
    .then(data=>{
      console.log(data)
      this.setState({
        mangaResults: data
      });
    })
  }


  handleFavorite=(anime)=>{
    const {favorites} =this.state;

    const favCopy = favorites.slice();
    const index = favorites.indexOf(anime);

    if (index >= 0){
      favCopy.splice(index,1);
    } else {
      favCopy.push(anime);
    }

    this.setState({
      favorites: favCopy
    });

    window.localStorage.clear();

    window.localStorage.setItem('favorites', JSON.stringify(favCopy));

  }

  handleInBookmark = (answer) => {
    if (answer === 'yes'){
      this.setState({
        inBookmark: true
      });
    }else{
      this.setState({
        inBookmark: false
      });
    }
  }



  render() {
    const {searchVal,byGenre,searchResults,favorites,inBookmark,mangaResults} = this.state;
    return (<div className ="my-body">
      <nav className="ui inverted massive fluid three item menu">
        <Link onClick={()=>this.handleInBookmark('no')} to="/" className="item link-style">Find My Anime</Link>
        <Link onClick={()=>this.handleInBookmark('no')} to="/manga" className="item link-style">Find My Manga</Link>
        <Link onClick={()=>this.handleInBookmark('yes')} to="/bookmark" className="item link-style">My Bookmarks</Link>
      </nav>

      {
        (inBookmark)
          ? null
          : (<SearchBar
            searchHandle={this.searchHandle}
            fetchSearched={this.fetchSearched}
            genreHandle={this.genreHandle}
            fetchGenre={this.fetchGenre}
             />)
      }
      <main>
        <Route exact path="/"
          render={ ()=> <SearchResult
            favorites={favorites}
            searchResults={searchResults}
            handleFavorite={this.handleFavorite}
                        /> }
        />
        <Route path="/bookmark"
          render={()=> <Bookmark
            favorites={favorites}
            handleFavorite={this.handleFavorite}
                       />}

        />
        <Route path="/manga"
          render={()=> <MangaPage
            handleFavorite={this.handleFavorite}
            mangaResults = {mangaResults}
            favorites={favorites}
                       />}
        />
      </main>
      <footer>
        <div className="copy"><Icon name="copyright outline icon"></Icon><p> Cai Yang 2019</p></div>
        <div className="copy"><Icon name="github icon"></Icon><a href="https://github.com/CaiY77/ani-manage" target="_blank">My Github</a></div>
      </footer>
    </div>);
  }
}

export default App;
