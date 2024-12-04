import { Star } from 'lucide-react';
import React from 'react'

type RatingProps = {
    rating: number;
}

const Rating = (props: RatingProps) => {
  return (
    [1,2,3,4,5].map((item) => (
        <Star key={item} 
        color={item <= props.rating ? "#FFC107" : "#E4E5E9"}
        />
    ))
  )
}

export default Rating