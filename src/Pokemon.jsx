import React, { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards.jsx";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=100";

  const fetchPokemon = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      // console.log(data);
      const DetailedPokemonData = data.results.map(async (curPokemon) => {
        // console.log(curPokemon.url);
        const res = await fetch(curPokemon.url);
        const data = await res.json();

        // console.log(data);

        return data;
      });
      const detailedResponses = await Promise.all(DetailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  //search funcitonality

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loader"> 
   
       
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Let's Catch Pokemon</h1>
        </header>

        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <ul className="cards">
            {
              // Map through the filtered search data and render PokemonCards for each Pokemon
              searchData.map((curPokemon) => {
                // Passing the current Pokemon data to the PokemonCards component as props
                return (
                  <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
                );
              })
            }
          </ul>
        </div>
      </section>
    </>
  );
};
