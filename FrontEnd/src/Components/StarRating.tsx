import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
interface StarRatingprops {
  rating: number;
}

export default function StarRating(props: StarRatingprops) {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {props.rating >= index + 1 ? (
          <FaStar className="icon" />
        ) : props.rating >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return (
    <>
      <div className="icon-style">{ratingStar}</div>
    </>
  );
}
