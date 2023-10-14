import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validate, validatePlatforms } from "./validation";
import styles from "./Form.module.css";

export default function Form(props) {
  const genres = useSelector((state) => state.allGenres);
  const platforms = useSelector((state) => state.allPlatforms);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    platforms: "",
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  React.useEffect(() => {
    const initialErrors = validate(formData);
    const platformErrors = validatePlatforms(selectedPlatforms);
    setErrors({
      ...initialErrors,
      platforms: platformErrors.platforms,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors(validate({ ...formData, [name]: value }));
    console.log(formSubmitted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/videogames", {
        name: formData.name,
        background_image: formData.image,
        description: formData.description,
        platforms: selectedPlatforms,
        released: formData.released,
        rating: formData.rating,
        genres: selectedGenres,
      });
      window.alert(
        `The videogame: "${response.data.name}" has been created successfully`
      );
      setFormData({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
      });
      setFormSubmitted(false);
      navigate("/home");
    } catch (error) {
      console.error(error);
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

  const handleChangePlatform = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedPlatforms((prevPlatforms) => [
        ...prevPlatforms,
        { platform: { name: value } },
      ]);
    } else {
      setSelectedPlatforms((prevPlatforms) =>
        prevPlatforms.filter(
          (platformObj) => platformObj.platform.name !== value
        )
      );
    }
    const platformErrors = validatePlatforms(selectedPlatforms);
    setErrors({ ...errors, platforms: platformErrors.platforms });
  };

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

  const selectPlatforms = platforms.map((platform) => (
    <React.Fragment key={platform}>
      <input
        type="checkbox"
        id={platform}
        name="platform"
        value={platform}
        onChange={handleChangePlatform}
      />
      <label htmlFor={platform}>{platform}</label>
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
          <p className={styles.danger}>{formSubmitted ? errors.name : ""}</p>
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
          <p className={styles.danger}>{formSubmitted ? errors.image : ""}</p>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <p className={styles.danger}>
            {formSubmitted ? errors.description : ""}
          </p>
        </div>
        <div>
          <label>Platforms:</label>
          <div>{selectPlatforms}</div>
          <p className={styles.danger}>
            {formSubmitted ? errors.platforms : ""}
          </p>
        </div>
        <div>
          <label>Release Date:</label>
          <input
            type="date"
            name="released"
            value={formData.released}
            onChange={handleChange}
          />
          <p className={styles.danger}>
            {formSubmitted ? errors.released : ""}
          </p>
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
          <p className={styles.danger}>{formSubmitted ? errors.rating : ""}</p>
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
