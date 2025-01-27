import React, { useEffect } from 'react';
import './index.css';
import { PokemonCards } from './PokemonCards.jsx';
export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);

    const API = " https://pokeapi.co/api/v2/pokemon?limit=24";

const fetchPokemon = async () => {
    try{
const response = await fetch(API)
const data = await response.json()
// console.log(data);
const DetailedPokemonData = data.results.map(async(curPokemon)=>{
// console.log(curPokemon.url); 
const res = await fetch(curPokemon.url);
const data = await res.json();

// console.log(data);

return data;

})
const detailedResponses = await Promise.all(DetailedPokemonData);
setPokemon(detailedResponses);
    }
    catch(error){
console.log(error);
    }
}

useEffect(() => {
fetchPokemon();

},[])


return (

  <>
  <section className="container">
<header>
<h1>Let's Catch Pokemon</h1>
</header>
<div>
    <ul className="cards">
{
pokemon.map((curPokemon)=>{


return <PokemonCards key={curPokemon.id} pokemonData={curPokemon} /> // passing data to child component using props


})
}

    </ul>
</div>

  </section>
    
    
  </>

)

}