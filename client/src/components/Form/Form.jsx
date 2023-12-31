import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validate, validatePlatforms } from "./validation";
import { setIsLoading } from "../../redux/actions";
import styles from "./Form.module.css";

export default function Form(props) {
  const { fetchVideogames } = props;
  const genres = useSelector((state) => state.allGenres);
  const platforms = useSelector((state) => state.allPlatforms);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const [formSuccess, setFormSuccess] = useState(false);

  React.useEffect(() => {
    const initialErrors = validate(formData);
    const platformErrors = validatePlatforms(selectedPlatforms);
    setErrors({
      ...initialErrors,
      platforms: platformErrors.platforms,
    });
  }, [formData, selectedPlatforms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors(validate({ ...formData, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (Object.keys(errors).length > 0 && errors.platforms) {
      return;
    }
    try {
      setFormSuccess(true);
      await axios.post(
        "https://pi-videogames-back-a5zj.onrender.com/videogames",
        {
          name: formData.name,
          background_image: formData.image,
          description: formData.description,
          platforms: selectedPlatforms,
          released: formData.released,
          rating: formData.rating,
          genres: selectedGenres,
        }
      );
      setFormData({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
      });
      dispatch(setIsLoading(true));
      await fetchVideogames();
      navigate("/home");
    } catch (error) {}
  };

  const selectGenres = genres.map((genre) => (
    <React.Fragment key={genre.id}>
      <div className={styles.checkboxOptions}>
        <input
          type="checkbox"
          id={genre.name}
          name="genre"
          value={genre.id}
          onChange={handleChangeGenre}
        />
        <label htmlFor={genre.name} className={styles.checkboxLabels}>
          {genre.name}
        </label>
      </div>
    </React.Fragment>
  ));

  const selectPlatforms = platforms.map((platform) => (
    <React.Fragment key={platform}>
      <div className={styles.checkboxOptions}>
        <input
          type="checkbox"
          id={platform}
          name="platform"
          value={platform}
          onChange={handleChangePlatform}
        />
        <label htmlFor={platform} className={styles.checkboxLabels}>
          {platform}
        </label>
      </div>
    </React.Fragment>
  ));

  return (
    <div className={styles.pageContainer}>
      {formSuccess ? (
        <div className={styles.successContainer}>
          <h1 className={styles.successMessageH1}>
            Videogame created successfully
          </h1>
          <p className={styles.successMessageP}>
            you will be redirected to the home in a few seconds...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.leftColumnContainer}>
            <div className={styles.leftContainer}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.leftInput}
                placeholder="Enter the videogame name"
              ></input>
              <p className={styles.danger}>
                {formSubmitted ? errors.name : ""}
              </p>
            </div>
            <div className={styles.leftContainer}>
              <label>Image</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter the image URL of the videogame"
                className={styles.leftInput}
              ></input>
              <p className={styles.danger}>
                {formSubmitted ? errors.image : ""}
              </p>
            </div>
            <div className={styles.leftContainerDescription}>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.descriptionInput}
                placeholder="Enter the description about the videogame"
              />
              <p className={styles.danger}>
                {formSubmitted ? errors.description : ""}
              </p>
            </div>
          </div>
          <div className={styles.rightColumnContainer}>
            <div className={styles.checkboxContainer}>
              <div className={styles.platformsContainer}>
                <label>Platforms</label>
                <div className={styles.checkboxLeftContainer}>
                  <div className={styles.checkboxLeft}>{selectPlatforms}</div>
                </div>
                <p className={styles.danger}>
                  {formSubmitted ? errors.platforms : ""}
                </p>
              </div>
              <div className={styles.platformsContainer}>
                <div>
                  <label className={styles.genresLabel}>Genres</label>
                  <div className={styles.checkboxRightContainer}>
                    <div className={styles.checkboxRight}>{selectGenres}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rightBottomContainer}>
              <div className={styles.rightBottomColumn}>
                <div className={styles.leftContainer}>
                  <label>Release Date</label>
                  <input
                    type="date"
                    name="released"
                    value={formData.released}
                    onChange={handleChange}
                    className={styles.rightInput}
                  />
                  <p className={styles.danger}>
                    {formSubmitted ? errors.released : ""}
                  </p>
                </div>
                <div className={styles.leftContainer}>
                  <label>Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className={styles.rightInput}
                    placeholder="Enter the videogame rating"
                  />
                  <p className={styles.danger}>
                    {formSubmitted ? errors.rating : ""}
                  </p>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.button}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
