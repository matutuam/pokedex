import { mostrarPokemones } from "../utilidadesPokemon.js";
import { POKEMONES_MOSTRADOS } from "../utilidadesPokemon.js";

const $botonSiguiente = document.querySelector("#boton-siguiente");
$botonSiguiente.onclick = mostrarPokemonesSiguientes;

export function mostrarPokemonesSiguientes() {
    window.indicePagina++;

    borrarPokemonesAnteriores();
    mostrarPokemones();
}

const $botonAtras = document.querySelector("#boton-atras");
$botonAtras.onclick = mostrarPokemonesAnteriores;

export function mostrarPokemonesAnteriores() {
    if (document.querySelector("#contenedor-pokemones li:last-child").id === `${POKEMONES_MOSTRADOS}` || window.indicePagina === 1) {
        return false;
    }
    
    window.indicePagina--;
    window.indicePokemones -= POKEMONES_MOSTRADOS * 2;

    borrarPokemonesAnteriores();
    mostrarPokemones();
}

function borrarPokemonesAnteriores() {
    const $cuadros = document.querySelectorAll(".cuadro");

    for (let i = 0; i < POKEMONES_MOSTRADOS; i++) {
        $cuadros[i].remove();
    }
}
