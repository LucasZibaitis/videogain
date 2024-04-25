import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validate, validatePlatforms } from "./validation";
import { setIsLoading } from "../../redux/actions";

const URL = process.env.REACT_APP_LOCAL_ENDPOINT;
// const URL = process.env.REACT_APP_DEPLOYED_ENDPOINT;

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
      await axios.post(`${URL}/videogames`, {
        name: formData.name,
        background_image: formData.image,
        description: formData.description,
        platforms: selectedPlatforms,
        released: formData.released,
        rating: formData.rating,
        genres: selectedGenres,
      });
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
      <div>
        <input
          type="checkbox"
          id={genre.name}
          name="genre"
          value={genre.id}
          onChange={handleChangeGenre}
        />
        <label class="pl-2 font-thin" htmlFor={genre.name}>
          {genre.name}
        </label>
      </div>
    </React.Fragment>
  ));

  const selectPlatforms = platforms.map((platform) => (
    <React.Fragment key={platform}>
      <div>
        <input
          type="checkbox"
          id={platform}
          name="platform"
          value={platform}
          onChange={handleChangePlatform}
        />
        <label class="pl-2 font-thin" htmlFor={platform}>
          {platform}
        </label>
      </div>
    </React.Fragment>
  ));

  return (
    <div class="flex justify-center">
      {formSuccess ? (
        <div class="flex flex-col items-center justify-center bg-[#3c4999] w-3/5 h-64 border-4 rounded-lg text-white gap-8 px-14 py-8">
          <h1 class="text-4xl font-light">Videogame created successfully</h1>
          <p class="text-2xl font-thin">
            you will be redirected to the home in a few seconds...
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          class="flex items-start justify-center gap-24 bg-[#3c4999] w-4/5 rounded-lg border-4 border-white text-white py-8"
        >
          <div class="flex flex-col gap-12 w-1/2">
            <div class="flex flex-col gap-2 w-full">
              <label class="text-2xl">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter the videogame name"
                class="rounded-lg h-10 pl-2 text-[#3c4999] outline-none"
              ></input>
              <p class="text-sm font-light">
                {formSubmitted ? errors.name : ""}
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-2xl">Image</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter the image URL of the videogame"
                class="rounded-lg h-10 pl-2 text-[#3c4999] outline-none"
              ></input>
              <p class="text-sm font-light">
                {formSubmitted ? errors.image : ""}
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-2xl">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter the description about the videogame"
                class="rounded-lg h-56 px-2 pt-2 text-[#3c4999] outline-none"
              />
              <p class="text-sm font-light">
                {formSubmitted ? errors.description : ""}
              </p>
            </div>
          </div>
          <div class="flex flex-col h-full gap-14">
            <div class="flex gap-8 w-full h-full">
              <div class="flex flex-col gap-2">
                <label class="text-2xl">Platforms</label>

                <div class="overflow-auto h-48 border-2 rounded-lg px-2">
                  {selectPlatforms}
                </div>

                <p class="text-sm font-light">
                  {formSubmitted ? errors.platforms : ""}
                </p>
              </div>
              <div>
                <div class="flex flex-col gap-2">
                  <label class="text-2xl">Genres</label>

                  <div class="overflow-auto h-48 border-2 rounded-lg px-2">
                    {selectGenres}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-between h-full">
              <div class="flex flex-col h-full justify-between w-full">
                <div class="flex flex-col gap-2 w-3/5">
                  <label class="text-2xl">Release Date</label>
                  <input
                    type="date"
                    name="released"
                    value={formData.released}
                    onChange={handleChange}
                    class="rounded-lg h-10 px-2 text-[#3c4999] outline-none"
                  />
                  <p class="text-sm font-light">
                    {formSubmitted ? errors.released : ""}
                  </p>
                </div>
                <div class="flex items-end justify-between w-full">
                  <div class="flex flex-col gap-2 w-3/5">
                    <label class="text-2xl">Rating</label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      placeholder="Enter the videogame rating"
                      class="rounded-lg h-10 pl-2 text-[#3c4999] outline-none"
                    />
                    <p class="text-sm font-light">
                      {formSubmitted ? errors.rating : ""}
                    </p>
                  </div>
                  <button
                    class="bg-[#65a30d] mb-2 h-10 w-28 rounded-lg border-2 border-white hover:scale-110 transition-all duration-300 text-2xl"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
