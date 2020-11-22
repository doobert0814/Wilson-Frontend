import React, { Component } from 'react';

import MovieList from './MovieList';

// greenyellow color 
class MainContainer extends Component {
    render() {
      // const { movies } = this.state;
      return (
          <div className='main-container'>
            <MovieList 
            thingToPassToMovieList={this.props.movie}
            posterToPassToMovieList={this.props.poster}
            />
          </div>
      );
    }
  }
  
  export default MainContainer;