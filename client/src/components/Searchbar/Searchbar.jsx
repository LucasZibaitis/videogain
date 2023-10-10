import React from "react";
import { useDispatch } from "react-redux";
import { setVideogamesByName } from "../../redux/actions";

export default function Searchbar(props) {
  const [name, setName] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    dispatch(setVideogamesByName(name));
  };

  return (
    <div>
      <input onChange={handleChange} />
      <button onClick={handleSearch}>Search Videogame</button>
    </div>
  );
}
