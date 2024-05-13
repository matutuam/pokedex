import { getOffset, getLimit } from "../../config.js";

export async function getPokemon() {
  const offset = getOffset();
  const limit = getLimit();

  const API_URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  return fetch(API_URL)
    .then((response) => response.json())
    .then((response) => response.results);
}

export async function getPokemonDetails(POKEMON_URL) {
  return fetch(POKEMON_URL)
    .then((response) => response.json())
    .then((response) => response);
}
