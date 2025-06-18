import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { LOGIN_BG_URL } from '../utils/constant'

const GptSearch = () => {
  return (
    <>
    
        <div className="fixed -z-10">
                <img
                className="h-screen w-full md:h-full object-cover"
                  src={LOGIN_BG_URL}
                  alt="bg-image"
                />
          </div>
          <div>
        <GptSearchBar />
        <GptMovieSuggestion />
    </div>
    </>
  )
}

export default GptSearch
