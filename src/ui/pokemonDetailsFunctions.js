import { getPokemonDetails } from "../api/apiCalls.js";

function addPokemonDetails(clickedPokemonData) {
  const $pokemonSprite = document.querySelector("#pokemon-sprite");
  $pokemonSprite.src = clickedPokemonData.sprites.front_default;

  const $pokemonName = document.querySelector("#pokemon-name");
  $pokemonName.textContent =
    clickedPokemonData.name.charAt(0).toUpperCase() +
    clickedPokemonData.name.slice(1);

  const $pokemonId = document.querySelector("#pokemon-id");
  $pokemonId.textContent = String(clickedPokemonData.id).padStart(4, "0");

  document.querySelector("#pokemon-hp").style =
    `width: ${(clickedPokemonData.stats[0].base_stat / 255) * 100}%`;

  document.querySelector("#pokemon-attack").style =
    `width: ${(clickedPokemonData.stats[1].base_stat / 190) * 100}%`;

  document.querySelector("#pokemon-defence").style =
    `width: ${(clickedPokemonData.stats[2].base_stat / 250) * 100}%`;
}

export async function handleNameClick(event) {
  const $clickedPokemon = event.target;
  const POKEMON_URL = $clickedPokemon.id;

  const clickedPokemonData = await getPokemonDetails(POKEMON_URL);
  addPokemonDetails(clickedPokemonData);
  showPokemonSprite();
}

function showPokemonSprite() {
  document.querySelector("#loading-sprite").classList.add("hidden");
  document.querySelector("#loading-sprite").classList.remove("block");
  document.querySelector("#pokemon-sprite").classList.add("block");
  document.querySelector("#pokemon-sprite").classList.remove("hidden");
}
