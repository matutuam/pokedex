import { linksPokemones } from "./api/procesarInformacionAPI.js";
import { mostrarInformacionPokemon, mostrarLoader } from "./ui/modalInformacion.js";

window.indicePagina = 1;
window.indicePokemones = 0;

export const POKEMONES_MOSTRADOS = 20;

export function mostrarPokemones() {
    for (let i = 0; i < POKEMONES_MOSTRADOS; i++) {
        crearContenedorPokemon();
    }
}

function crearContenedorPokemon() {
    window.indicePokemones++;

    const $contenedorPokemones = document.querySelector("#contenedor-pokemones");

    const nombrePokemon = linksPokemones[window.indicePokemones - 1].name;

    const $liPokemon = document.createElement("li");
    $liPokemon.id = `${linksPokemones[window.indicePokemones - 1].id}`;
    $liPokemon.classList = "col cuadro pokemon";

    mostrarLoader();

    const $img = document.createElement("img");
    $img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${window.indicePokemones}.png`;

    const $h4 = document.createElement("h4");
    $h4.textContent = nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1);

    $liPokemon.appendChild($img);
    $liPokemon.appendChild($h4);
    $contenedorPokemones.appendChild($liPokemon);

    $liPokemon.addEventListener("click", mostrarInformacionPokemon);
}
