import { mostrarPokemones } from "../utilidadesPokemon.js";

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
    if (document.querySelector("#contenedor-pokemones li:last-child").id === "20" || window.indicePagina === 1) {
        return false;
    }
    
    window.indicePagina--;
    window.indicePokemones -= 40;

    borrarPokemonesAnteriores();
    mostrarPokemones();
}

function borrarPokemonesAnteriores() {
    const $cuadros = document.querySelectorAll(".cuadro");

    for (let i = 0; i < 20; i++) {
        $cuadros[i].remove();
    }
}
