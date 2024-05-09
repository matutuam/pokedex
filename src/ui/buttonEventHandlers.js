import { getOffset, setOffset } from "../../config.js";
import { removePreviousPokemonList } from "./removePreviousPokemonList.js";
import { init } from "../index.js";

export function handleButtonClick(event) {
  const $clickedButton = event.target;
  removePreviousPokemonList();

  let newOffset = getOffset();

  if ($clickedButton.id === "previous-button") {
    newOffset -= 20;
  } else if ($clickedButton.id === "next-button") {
    newOffset += 20;
  }

  setOffset(newOffset);
  init();
}
