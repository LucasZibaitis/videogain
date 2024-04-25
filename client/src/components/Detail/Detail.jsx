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
      <ul class="font-light text-lg list-disc list-inside">
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
        <div>
          <h1>Videogame deleted successfully</h1>
          <p>you will be redirected to the home in a few seconds...</p>
        </div>
      ) : deleteConfirmation ? (
        <div>
          <h1>Are you sure you want to delete this videogame?</h1>
          <div>
            <div
              onClick={() => {
                deleteVideogame();
              }}
            >
              <h2>Yes</h2>
            </div>
            <div
              onClick={() => {
                setDeleteConfirmation(false);
              }}
            >
              <h2>No</h2>
            </div>
          </div>
        </div>
      ) : videogame.name ? (
        <div class="w-4/5 bg-[#3c4999] border-4 rounded-lg flex text-white gap-14 px-14 py-8">
          <div class="flex flex-col gap-4">
            <div class="h-3/5">
              <img
                src={videogame.background_image}
                alt=""
                class="border-4 border-white rounded-lg h-full object-cover"
              />
            </div>
            <div>
              <h2 class="text-2xl">ID: {videogame.id}</h2>
              {uuidv4Pattern.test(videogame.id) ? (
                <div
                  onClick={() => {
                    setDeleteConfirmation(true);
                  }}
                >
                  <h2>Delete from database</h2>
                </div>
              ) : null}
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <h1 class="text-4xl">{videogame.name}</h1>
            <div class="flex flex-col gap-2">
              <h2 class="text-3xl font-light">Description</h2>

              <div
                class="overflow-auto max-h-56 text-xl font-light border-2 pl-2 rounded-lg"
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
                <h2 class="text-3xl font-light text-lg">Genres</h2>
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
        <div>
          <div>
            <h1>loading videogame...</h1>
          </div>
        </div>
      )}
    </div>
  );
}
