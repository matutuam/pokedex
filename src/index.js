import { obtenerPokemones } from "./api/llamadaAPI.js";
import { procesarInformacion } from "./api/procesarInformacionAPI.js";
import { mostrarPokemonesSiguientes } from "./ui/manejadorEventosBotones.js";
import { mostrarPokemonesAnteriores } from "./ui/manejadorEventosBotones.js";

async function iniciar() {
    const dataPokemones = await obtenerPokemones();
    procesarInformacion(dataPokemones);
}

const $botonSiguiente = document.querySelector("#boton-siguiente");
$botonSiguiente.onclick = mostrarPokemonesSiguientes;

const $botonAtras = document.querySelector("#boton-atras");
$botonAtras.onclick = mostrarPokemonesAnteriores;

iniciar();
