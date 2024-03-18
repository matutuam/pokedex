import { linksPokemones } from "../api/procesarInformacionAPI.js";
import { abrirModal } from "./modal.js";

export function mostrarInformacionPokemon(e) {
    let pokemonSeleccionado = e.target;

    if (pokemonSeleccionado != "li") {
        pokemonSeleccionado = e.target.closest("li");
    }

    const URL_POKEMON = linksPokemones[parseInt(pokemonSeleccionado.id) -1].url;

    fetch(URL_POKEMON)
        .then(respuesta => respuesta.json())
        .then(dataPokemon => {
            const nombrePokemon = dataPokemon.name;

            const $img = document.createElement("img");
            $img.src = dataPokemon.sprites.other.dream_world.front_default;

            mostrarLoader();

            const $contenedorPokemon = document.querySelector("#contenedor-img");
            $contenedorPokemon.appendChild($img);

            ocultarLoader();

            document.querySelector("#nombre-pokemon").textContent = nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1);
            document.querySelector("#altura-pokemon").textContent = `${dataPokemon.height}`;
            document.querySelector("#peso-pokemon").textContent = `${dataPokemon.weight}`;
            document.querySelector("#experiencia-pokemon").textContent = `${dataPokemon.base_experience}`;
        })
        .catch(error => {console.error("Error al obtener datos:", error)})
    abrirModal();
}

export function mostrarLoader() {
    const $loader = document.querySelector(".loader");
    $loader.style.display = "block";
}

export function ocultarLoader() {
    const $loader = document.querySelector(".loader");
    $loader.style.display = "none";
}
