export async function getPokemon(limit, offset) {
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
