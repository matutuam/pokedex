import { mostrarInformacionPokemon } from "../ui/modalInformacion.js";

const $modal = document.querySelector(".close");
$modal.addEventListener("click", cerrarModal);

export function abrirModal() {
    document.querySelector(".modal").classList.remove("oculto");

    const $cuadrosPokemones = document.querySelectorAll("li");
    
    for (let i = 0; i < $cuadrosPokemones.length; i++) {
        $cuadrosPokemones[i].removeEventListener("click", mostrarInformacionPokemon);
    }
}

function cerrarModal() {
    document.querySelector(".modal").classList.add("oculto");
    document.querySelector("#contenedor-img img").remove();

    document.body.style.overflow = "";

    const $cuadrosPokemones = document.querySelectorAll("li");

    for (let i = 0; i < $cuadrosPokemones.length; i++) {
        $cuadrosPokemones[i].addEventListener("click", mostrarInformacionPokemon);
    }
}
