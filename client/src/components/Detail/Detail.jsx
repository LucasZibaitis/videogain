import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setIsLoading } from "../../redux/actions";
import axios from "axios";

const URL = process.env.REACT_APP_LOCAL_ENDPOINT;
// const URL = process.env.REACT_APP_DEPLOYED_ENDPOINT;

export default function Detail(props) {
  const { fetchVideogames } = props;
  const { id } = useParams();
  const [videogame, setVideogame] = useState({
    id: id,
    name: "",
    description: "",
    background_image: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uuidv4Pattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  useEffect(() => {
    async function fetchVideogame() {
      try {
        const response = await axios.get(`${URL}/videogames/videogame/${id}`);
        const data = response.data;
        const {
          name,
          description,
          background_image,
          released,
          rating,
          genres,
          platforms,
        } = data;

        setVideogame({
          id,
          name,
          description,
          background_image,
          released,
          rating,
          genres,
          platforms,
        });
      } catch (error) {
        window.alert("No hay personajes con este ID");
      }
    }
    fetchVideogame();
  }, [id]);

  function renderGenres() {
    return (
      <ul class="font-light text-lg list-disc list-inside">
        {videogame.genres.map((genre, index) => (
          <li key={index}>{genre.name}</li>
        ))}
      </ul>
    );
  }

  function renderPlatforms() {
    return (
      <ul class="font-light text-lg list-disc list-inside overflow-auto max-h-36 pr-4">
        {videogame.platforms.map((platform) => (
          <li>{platform.platform.name}</li>
        ))}
      </ul>
    );
  }

  function createMarkup(text) {
    return { __html: text };
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }

  async function deleteVideogame() {
    try {
      setDeleteSuccess(true);
      await axios.delete(`${URL}/videogames/videogame/${id}`);
      dispatch(setIsLoading(true));
      await fetchVideogames();
      navigate("/home");
    } catch (error) {
      window.alert("Videogame could not be deleted");
    }
  }

  return (
    <div class="flex items-center justify-center">
      {deleteSuccess ? (
        <div class="flex flex-col items-center justify-center bg-[#3c4999] w-3/5 h-64 border-4 rounded-lg text-white gap-8 px-14 py-8">
          <h1 class="text-4xl font-light">Videogame deleted successfully</h1>
          <p class="text-2xl font-thin">
            you will be redirected to the home in a few seconds...
          </p>
        </div>
      ) : deleteConfirmation ? (
        <div class="flex flex-col items-center justify-center bg-[#3c4999] w-3/5 h-64 border-4 rounded-lg text-white gap-14 px-14 py-8">
          <h1 class="text-4xl font-light">
            Are you sure you want to delete this videogame?
          </h1>
          <div class="flex gap-24">
            <button
              onClick={() => {
                deleteVideogame();
              }}
              class="hover:scale-110 transition-all duration-300 border-2 rounded-lg px-10 hover:bg-[#cc7a1d]"
            >
              <h2 class="text-4xl font-light">Yes</h2>
            </button>
            <button
              onClick={() => {
                setDeleteConfirmation(false);
              }}
              class="hover:scale-110 transition-all duration-300 border-2 rounded-lg px-10 hover:bg-[#cc7a1d]"
            >
              <h2 class="text-4xl font-light">No</h2>
            </button>
          </div>
        </div>
      ) : videogame.name ? (
        <div class="bg-[#3c4999] border-4 rounded-lg flex text-white gap-14 px-14 py-8 w-4/5">
          <div class="flex flex-col gap-4  items-center">
            <div class="h-4/5">
              <img
                src={videogame.background_image}
                alt=""
                class="border-4 border-white rounded-lg h-full max-w-80 object-cover"
              />
            </div>
            {uuidv4Pattern.test(videogame.id) ? (
              <button
                onClick={() => {
                  setDeleteConfirmation(true);
                }}
                class="bg-[#ff1818] border-2 border-white rounded-lg px-8 h-8 hover:scale-110 transition-all duration-300"
              >
                Delete from database
              </button>
            ) : null}
          </div>
          <div class="flex flex-col gap-4 w-full">
            <h1 class="text-5xl">{videogame.name}</h1>
            <div class="flex flex-col gap-2">
              <h2 class="text-3xl font-light">Description</h2>

              <div
                class="overflow-auto max-h-64 text-xl font-light border-2 pl-2 rounded-lg"
                dangerouslySetInnerHTML={createMarkup(videogame.description)}
              />
            </div>

            <div class="flex justify-between">
              <div>
                <h2 class="text-3xl font-light">Release Date</h2>
                <div class="font-light text-lg">
                  {formatDate(videogame.released)}
                </div>
              </div>
              <div>
                <h2 class="text-3xl font-light">Rating</h2>
                <div class="font-light text-lg">{videogame.rating}</div>
              </div>
              <div>
                <h2 class="text-3xl font-light">Genres</h2>
                {renderGenres()}
              </div>
              <div class="flex flex-col items-start">
                <h2 class="text-3xl font-light">Platforms</h2>
                {renderPlatforms()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="flex items-center justify-center bg-[#3c4999] w-1/2 h-64 border-4 rounded-lg text-white gap-14 px-14 py-8">
          <h1 class="text-4xl font-light">loading videogame...</h1>
        </div>
      )}
    </div>
  );
}
