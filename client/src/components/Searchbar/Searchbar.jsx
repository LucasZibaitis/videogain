import React from "react";

export default function Searchbar(props) {
  const [name, setName] = React.useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    props.onSearchByName(name);
  };

  return (
    <div>
      <input onChange={handleChange} />
      <button onClick={handleSearch}>Search Videogame</button>
    </div>
  );
}
