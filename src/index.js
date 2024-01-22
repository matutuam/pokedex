let limit = 600; // Limit => cantidad total de pokémones llamados
let offset = 0; // Offset => número desde el pokémon en que arrancará a llamar
let infoPokemones;
let indicePokemones = 0;

const API_URL = (`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);

fetch(API_URL)
    .then(respuesta => respuesta.json())
    .then(data => {
        infoPokemones = data.results;

        procesarDatos(infoPokemones);
        mostrarPokemonesEnPantalla();
    })
    .catch(error => {
        console.error("Error al obtener datos:", error);
    })

function procesarDatos(datos) {
    Object.keys(datos).forEach((key) => {
        guardarInformacionPokemon(datos[key].url);
    })
}

function guardarInformacionPokemon(urlPokemon) {
    fetch(urlPokemon)
        .then(respuesta => respuesta.json())
        .then(data => {
            const pokemon = {
                id: data.id,
                name: data.name,
                height: data.height,
                weight: data.weight,
                experience: data.base_experience,
                sprite: data.sprites.front_default
            };

            if (localStorage.getItem(pokemon.id) !== null) {
                return;
            } else {
                localStorage.setItem(`${pokemon.id}`, JSON.stringify(pokemon));
                return;
            }

            // Ejemplo para recuperar la información de un pokémon => const pokemonRecuperado = JSON.parse(localStorage.getItem("1"));
        })
}

function mostrarPokemonesEnPantalla() {
    const $renglon1 = document.querySelector("#renglon-1");
    const $renglon2 = document.querySelector("#renglon-2");

    for(let i = 0; i <= 5; i++) {
        indicePokemones++;
        const pokemonRecuperado = JSON.parse(localStorage.getItem(`${indicePokemones}`));

        const nombrePokemon = pokemonRecuperado.name;

        const $cuadroNuevo = document.createElement("div");
        $cuadroNuevo.classList = "col cuadro";

        const $img = document.createElement("img");
        $img.src = pokemonRecuperado.sprite;

        const $h4 = document.createElement("h4");
        $h4.textContent = nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1);

        $cuadroNuevo.appendChild($img);
        $cuadroNuevo.appendChild($h4);

        if (i <= 2) {
            $renglon1.appendChild($cuadroNuevo);
        }

        if (i >= 3) {
            $renglon2.appendChild($cuadroNuevo);
        }
    }
}

const $botonSiguiente = document.querySelector("#boton-siguiente");
$botonSiguiente.onclick = mostrarPokemonesSiguientes;

function mostrarPokemonesSiguientes() {
    if (indicePokemones === 600) {
        return false;
    }

    borrarPokemonesAnteriores();
    mostrarPokemonesEnPantalla(indicePokemones);
}

const $botonAtras = document.querySelector("#boton-atras");
$botonAtras.onclick = mostrarPokemonesAnteriores;

function mostrarPokemonesAnteriores() {
    if (indicePokemones === 6) {
        return false;
    }

    borrarPokemonesAnteriores();
    mostrarPokemonesEnPantalla(indicePokemones -= 12);
}

function borrarPokemonesAnteriores() {
    const $cuadros = document.querySelectorAll(".cuadro");

    for (let i = 0; i < 6; i++) {
        $cuadros[i].remove();
    }
}
