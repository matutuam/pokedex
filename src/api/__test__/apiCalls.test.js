import { getPokemon } from "../apiCalls.js";
import { getPokemonDetails } from "../apiCalls.js";

test("Data is an Object", async () => {
  const limit = 20;
  const offset = 0;

  const data = await getPokemon(offset, limit);
  expect(typeof data).toBe("object");
});

test("Data is an Object", async () => {
  const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon/1`;

  const pokemonDetails = await getPokemonDetails(POKEMON_URL);
  expect(typeof pokemonDetails).toBe("object");
});
