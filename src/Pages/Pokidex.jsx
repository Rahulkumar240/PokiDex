import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
const Pokidex = () => {
  const [pokelimit, setPokelimit] = useState(20);
  const API = `https://pokeapi.co/api/v2/pokemon?limit=${pokelimit}&offset=0`;

  const [search, setsearch] = useState("");


  const [data, setData] = React.useState([]);

  const getpokemondata = async () => {
    try {
      const response = await axios.get(API);
      console.log(response.data.results);
      setData(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  const searchPokemon = async () => {
    if (search === "") return; // Do nothing if search is empty

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );

      // Set data as a single Pokémon in same format as your list
      setData([{
        name: response.data.name,
        url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}/`
      }]);

    } catch (error) {
      setData([]); // Clear data if Pokémon not found
    }
  };


  useEffect(() => {
    if (search === "") {
      getpokemondata();
    } else {
      searchPokemon();
    }
  }, [pokelimit, search]);


  const filterdata = data;

  return (
    <div style={{ padding: "10px 20px" }}>
      <Navbar search={search} setsearch={setsearch} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "20px",
        }}
      >
        {filterdata.map((pokemon, index) => {
          const id = pokemon.url.split("/")[6];
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <img
                src={image}
                alt={pokemon.name}
                style={{ width: "100%", maxWidth: "120px", height: "auto" }}
              />
              <h3>{pokemon.name.toUpperCase()}</h3>
            </div>
          );
        })}
      </div>
      <div className='flex justify-center'>
        <button
          onClick={() => setPokelimit(pokelimit + 20)}
          className='bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full max-w-xs'
        >
          Load More
        </button>
      </div>
    </div>
  )
}

export default Pokidex