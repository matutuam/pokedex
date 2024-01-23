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
        $cuadroNuevo.id = `${pokemonRecuperado.id}`;
        $cuadroNuevo.classList = "col cuadro pokemon";

        const $img = document.createElement("img");
        $img.src = pokemonRecuperado.sprite;

        const $h4 = document.createElement("h4");
        $h4.textContent = nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1);

        $cuadroNuevo.appendChild($img);
        $cuadroNuevo.appendChild($h4);

        $cuadroNuevo.addEventListener("click", mostrarInformacionPokemon);

        if (i <= 2) {
            $renglon1.appendChild($cuadroNuevo);
        }

        if (i >= 3) {
            $renglon2.appendChild($cuadroNuevo);
        }
    }
}

function mostrarInformacionPokemon(e) {
    let pokemonMostrado = e.target;

    if (pokemonMostrado != "div") {
        pokemonMostrado = e.target.parentNode;
    }

    const pokemonRecuperado = JSON.parse(localStorage.getItem(`${pokemonMostrado.id}`));

    if (pokemonRecuperado === null) {
        return;
    }

    abrirModal();

    const nombrePokemon = pokemonRecuperado.name;

    const $img = document.createElement("img");
    $img.src = pokemonRecuperado.sprite;

    const $contenedorPokemon = document.querySelector("#contenedor-img");
    $contenedorPokemon.appendChild($img);

    document.querySelector("#nombre-pokemon").textContent = nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1);
    document.querySelector("#altura-pokemon").textContent = `${pokemonRecuperado.height}`;
    document.querySelector("#peso-pokemon").textContent = `${pokemonRecuperado.weight}`;
    document.querySelector("#experiencia-pokemon").textContent = `${pokemonRecuperado.experience}`;
}

const $modal = document.querySelector(".modal");
$modal.addEventListener("click", cerrarModal);

function abrirModal() {
    document.querySelector(".modal").classList.remove("oculto");

    const $cuadros = document.querySelectorAll(".pokemon");
    
    for (let i = 0; i < $cuadros.length; i++) {
        $cuadros[i].removeEventListener("click", mostrarInformacionPokemon);
    }
}

function cerrarModal() {
    document.querySelector(".modal").classList.add("oculto");
    document.querySelector("#contenedor-img img").remove();
    
    const $cuadros = document.querySelectorAll(".pokemon");

    for (let i = 0; i < $cuadros.length; i++) {
        $cuadros[i].addEventListener("click", mostrarInformacionPokemon);
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
