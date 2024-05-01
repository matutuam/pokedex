let limit = 20;
let offset = 0;

async function getPokemon(limit, offset) {
  const API_URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  return fetch(API_URL)
    .then((response) => response.json())
    .then((response) => response.results);
}

function updatePokemonList(data) {
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

async function handleNameClick(event) {
  const $clickedPokemon = event.target;
  const POKEMON_URL = $clickedPokemon.id;

  const clickedPokemonData = await getPokemonDetails(POKEMON_URL);
  addPokemonDetails(clickedPokemonData);
}

async function getPokemonDetails(POKEMON_URL) {
  return fetch(POKEMON_URL)
    .then((response) => response.json())
    .then((response) => response);
}

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

const $previousButton = document.querySelector("#previous-button");
$previousButton.addEventListener("click", handleButtonClick);

const $nextButton = document.querySelector("#next-button");
$nextButton.addEventListener("click", handleButtonClick);

function removePreviousPokemonList() {
  const $pokemonList = document.querySelectorAll("li");

  for (let i = 0; i < $pokemonList.length; i++) {
    const $currentName = $pokemonList[i];
    $currentName.remove();
  }
}

function handleButtonClick(event) {
  const $clickedButton = event.target;
  removePreviousPokemonList();

  if ($clickedButton.id === "previous-button") {
    limit -= 20;
    offset -= 20;
  } else if ($clickedButton.id === "next-button") {
    limit += 20;
    offset += 20;
  }

  init();
}

async function init() {
  const data = await getPokemon(limit, offset);
  updatePokemonList(data);
}

init();
