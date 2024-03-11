import { mostrarPokemones } from "../utilidadesPokemon.js";

export const linksPokemones = [];

export function procesarInformacion(informacionPokemones) {
    let idPokemon = 1;

    Object.keys(informacionPokemones).forEach((key) => {
        const dataPokemon = {
            id: idPokemon++,
            name: informacionPokemones[key].name,
            url: informacionPokemones[key].url
        }

        linksPokemones.push(dataPokemon);
    });

    mostrarPokemones();
}
