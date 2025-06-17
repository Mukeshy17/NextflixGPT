import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestion = () => {

  const suggestedMovies = useSelector((store) => store.gpt);
  const { movieNames, movieResults } = suggestedMovies;

  if(!movieNames) return null;
  return (
    <div className='p-4 m-4 bg-black/90 text-white rounded-2xl'>
      <div>
        {movieNames.map((name, index) => (
          <MovieList key={name} title={name} movies={movieResults[index]} />
        ))}
      </div>
    </div>
  )
}

export default GptMovieSuggestion
