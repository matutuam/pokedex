import { getPokemonDetails } from "../api/apiCalls.js";
import { Pokemon } from "../api/pokemon.js";

function addPokemonDetails(clickedPokemonData) {
  const $pokemonSprite = document.querySelector("#pokemon-sprite");
  $pokemonSprite.src = clickedPokemonData.sprite;

  const $pokemonName = document.querySelector("#pokemon-name");
  $pokemonName.textContent =
    clickedPokemonData.name.charAt(0).toUpperCase() +
    clickedPokemonData.name.slice(1);

  const $pokemonId = document.querySelector("#pokemon-id");
  $pokemonId.textContent = String(clickedPokemonData.id).padStart(4, "0");

  document.querySelector("#pokemon-hp").style =
    `width: ${clickedPokemonData.statics.hp}%`;

  document.querySelector("#pokemon-attack").style =
    `width: ${clickedPokemonData.statics.attack}%`;

  document.querySelector("#pokemon-defence").style =
    `width: ${clickedPokemonData.statics.defence}%`;
}

export async function handleNameClick(event) {
  const $clickedPokemon = event.target;
  const POKEMON_URL = $clickedPokemon.id;

  const clickedPokemonData = await getPokemonDetails(POKEMON_URL);
  const pokemon = new Pokemon(clickedPokemonData);

  addPokemonDetails(pokemon);
  showPokemonSprite();
}

function showPokemonSprite() {
  document.querySelector("#loading-sprite").classList.add("hidden");
  document.querySelector("#loading-sprite").classList.remove("block");
  document.querySelector("#pokemon-sprite").classList.add("block");
  document.querySelector("#pokemon-sprite").classList.remove("hidden");
}
