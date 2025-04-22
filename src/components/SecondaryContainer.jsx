import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log(movies.popularMovies);
  

  return (
    <div className='bg-black'>
      <div className='-mt-72 relative z-10'>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies }/>
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies }/>
        <MovieList title={"Upcoming"} movies={movies.upcomingMovies }/>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies }/>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies }/>
        </div>
    </div>
  )
}

export default SecondaryContainer
