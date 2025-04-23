import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { LOGIN_BG_URL } from '../utils/constant'

const GptSearch = () => {
  return (
    <div>
        <div className="absolute -z-10">
                <img
                className="w-full h-full object-cover"
                  src={LOGIN_BG_URL}
                  alt="bg-image"
                />
            </div>
        <GptSearchBar />
        <GptMovieSuggestion />
    </div>
  )
}

export default GptSearch
