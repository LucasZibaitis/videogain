import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Form(props) {
  const { genres } = props;

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    platforms: [],
    releaseDate: "",
    rating: "",
  });

  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/videogames", {
        name: formData.name,
        image: formData.image,
        description: formData.description,
        platforms: formData.platforms,
        releaseDate: formData.releaseDate,
        rating: formData.rating,
        genres: selectedGenres,
      });

      console.log("Videojuego creado:", response.data);

      setFormData({
        name: "",
        image: "",
        description: "",
        platforms: "",
        releaseDate: "",
        rating: "",
        genres: [],
      });
      setSelectedGenres([]);
    } catch (error) {
      console.error("Error al crear el videojuego:", error);
    }
  };

  const handleChangeGenre = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedGenres((prevGenres) => [...prevGenres, value]);
    } else {
      setSelectedGenres((prevGenres) =>
        prevGenres.filter((genre) => genre !== value)
      );
    }
  };

  // useEffect(() => {
  //   console.log(selectedGenres);
  // }, [selectedGenres]);

  const selectGenres = genres.map((genre) => (
    <React.Fragment key={genre.id}>
      <input
        type="checkbox"
        id={genre.name}
        name="genre"
        value={genre.id}
        onChange={handleChangeGenre}
      />
      <label htmlFor={genre.name}>{genre.name}</label>
    </React.Fragment>
  ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Platforms:</label>
          <input
            type="text"
            name="platforms"
            value={formData.platforms}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Release Date:</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Genres:</label>
          <div>{selectGenres}</div>
        </div>
        <button type="submit">Create Videogame</button>
      </form>
    </div>
  );
}
