import React, {Component} from 'react';
import { Modal, Icon, Button } from 'semantic-ui-react'
import Anime from './Anime'
import Episode from './Episode'
import '../css/SearchResult.css'

class SearchResults extends Component {

  printAnime = () => {
    const {searchResults,handleFavorite,favorites} = this.props;

    const allAnime = searchResults.map(anime=>{
      let isFave = favorites.includes(anime);

      return <Modal key={anime.mal_id}
        trigger={ <div className="div-style">
          <Anime
            anime={anime}
            img ={anime.image_url}
            title={anime.title}
            episodes = {anime.episodes}
            score = {anime.score}
            syn = {anime.synopsis}
            handleFavorite = {handleFavorite}
            favorites={favorites}
            isFave = {isFave}
          />
        </div>
        }>
        <Modal.Content>
          <Episode animeID={anime.mal_id} />
        </Modal.Content>
      </Modal>
    })

    return allAnime;
  }

  render() {
    return (<div className ="search-result-style">
      <h1 className="result-style">MY ANIME</h1>
      {this.printAnime()}
    </div>);
  }

}

export default SearchResults;
