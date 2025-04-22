import React from 'react'
import { IMG_CDN_URL } from '../utils/constant'

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-40 pr-4'>
      <img className='rounded-sm' src={IMG_CDN_URL+posterPath} alt="" />
    </div>
  )
}

export default MovieCard
