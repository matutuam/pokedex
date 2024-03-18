import { linksPokemones as linksPokemones2 } from "../api/procesarInformacionAPI.js";
import { POKEMONES_MOSTRADOS as POKEMONES_MOSTRADOS2 } from "../utilidadesPokemon.js";

export function actualizarNumeroPaginaActual() {
    document.querySelector("#pagina-actual").textContent = `${window.indicePagina}`;
}

export function actualizarNumeroPaginasTotal() {
    document.querySelector("#pagina-final").textContent = Math.ceil(linksPokemones2.length / POKEMONES_MOSTRADOS2);
}
