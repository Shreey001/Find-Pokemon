import "./index.css"

export const PokemonCards = ({pokemonData}) => {
    return(
    <li className="pokemon-card"> 
    <figure >
    <img  src={pokemonData.sprites.front_default} alt={pokemonData.name} />
    </figure>
    
     </li>
    )
}