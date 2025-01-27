import React, { useEffect, useState } from 'react';
import './index.css';
import { PokemonCards } from './PokemonCards.jsx';
export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API = " https://pokeapi.co/api/v2/tpokemon?limit=24";

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
setLoading(false);
    }
    catch(error){
console.log(error);
setLoading(false);
   setError(error);
}
}
useEffect(() => {
fetchPokemon();

},[])

if(loading){
    return(
        <div>
     <h1>Loading...</h1>
     </div> 
     )
}

if (error){

    return(
<div>
    <h1>{error.message}</h1>
</div>
    )
}


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