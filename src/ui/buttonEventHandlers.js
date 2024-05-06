import { removePreviousPokemonList } from "./removePreviousPokemonList.js";
import { init } from "../index.js";

export function handleButtonClick(event) {
  const $clickedButton = event.target;
  removePreviousPokemonList();

  if ($clickedButton.id === "previous-button") {
    window.offset -= 20;
  } else if ($clickedButton.id === "next-button") {
    window.offset += 20;
  }

  init();
}
