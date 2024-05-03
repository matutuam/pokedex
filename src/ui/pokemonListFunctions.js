import { handleNameClick } from "./pokemonDetailsFunctions.js";

export function updatePokemonList(data) {
  Object.keys(data).forEach((key) => {
    const currentPokemon = {
      name: data[key].name,
      link: data[key].url,
    };

    addNewName(currentPokemon);
  });
}

function addNewName(currentPokemon) {
  const $pokemonList = document.querySelector("#pokemon-list");

  const $newName = document.createElement("li");
  $newName.className =
    "mb-2 cursor-pointer hover:border border-slate-600 p-1 rounded-md active:border-blue-500";
  $newName.textContent =
    currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1);
  $newName.id = currentPokemon.link;

  $newName.addEventListener("click", handleNameClick);
  $pokemonList.appendChild($newName);
}
