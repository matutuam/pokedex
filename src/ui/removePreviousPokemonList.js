export function removePreviousPokemonList() {
  const $pokemonList = document.querySelectorAll("li");

  for (let i = 0; i < $pokemonList.length; i++) {
    const $currentName = $pokemonList[i];
    $currentName.remove();
  }
}
