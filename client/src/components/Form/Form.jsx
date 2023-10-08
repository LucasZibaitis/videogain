import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Form() {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(
          "http://localhost:3001/videogames/genres"
        );
        setGenres(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGenres();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    platforms: "",
    releaseDate: "",
    rating: "",
    genres: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenresChange = (e) => {
    const { options } = e.target;
    const genres = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        genres.push(options[i].value);
      }
    }
    setFormData({ ...formData, genres });
  };

  const selectGenres = genres.map((genre) => (
    <React.Fragment key={genre.id}>
      <input type="checkbox" id={genre.id} name={genre.name} value={genre.id} />
      <label htmlFor={genre.id}>{genre.name}</label>
    </React.Fragment>
  ));

  return (
    <div>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="URL"
          ></input>
        </div>
        <div>
          <label>Select one or more genres:</label>
          <div>{selectGenres}</div>
        </div>
      </form>
    </div>
  );
}
