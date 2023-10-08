import React from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Form() {
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(
          "http://localhost:3001/videogames/genres"
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGenres();
  }, []);
  return <div></div>;
}
