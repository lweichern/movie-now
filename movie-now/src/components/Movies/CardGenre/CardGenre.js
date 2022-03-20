import React, { useEffect, useState } from "react";
import { Card, CardImage, CardTextTitle } from "./CardGenre.styled";
import api_details from "../../../API_Details";

export default function CardGenre({ genre }) {
  const [movie, setMovie] = useState();

  useEffect(() => {
    fetchTopRatedMovieByGenre();
  }, []);

  const fetchTopRatedMovieByGenre = async () => {
    try {
      const movie = await api_details.fetchTopRatedMovieByGenre(genre.id);
      console.log(movie);
      setMovie(movie.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Framer motion variants
  const imageVariants = {
    rest: {
      opacity: 1,
    },
    hover: {
      opacity: 0.3,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    rest: {
      opacity: 0,
      y: "-30%",
      x: "-50%",
    },
    hover: {
      opacity: 1,
      y: "-50%",
      x: "-50%",
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut",
      },
    },
  };

  return (
    <Card initial="rest" whileHover="hover" animate="rest">
      {/* <CardImage
        src={`${api_details.IMAGE_BASE_URL}${api_details.BACKDROP_SIZE}${
          movie !== undefined && movie.backdrop_path
        }`}
      /> */}
      {movie !== undefined && (
        <CardImage
          src={`${api_details.IMAGE_BASE_URL}${api_details.BACKDROP_SIZE}${movie.backdrop_path}`}
          variants={imageVariants}
        />
      )}

      <CardTextTitle variants={textVariants}>{genre.name}</CardTextTitle>
    </Card>
  );
}
