let limit = 20; // Limit => cantidad total de pokémones llamados
let offset = 0; // Offset => número desde el pokémon en que arrancará a llamar
let informacionPokemones;

obtenerLinksPokemones();

function obtenerLinksPokemones() {
    const API_URL = (`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);


    fetch(API_URL)
        .then(respuesta => respuesta.json())
        .then(data => {
            informacionPokemones = data.results;
            procesarInformacion(informacionPokemones);
        })
        .catch(error => {
            console.error("Error al obtener datos:", error);
        })
}

function procesarInformacion(informacionPokemones) {
    Object.keys(informacionPokemones).forEach((key) => {
        llamarPokemon(informacionPokemones[key].url);
    });
}

function llamarPokemon(urlPokemon) {
    fetch(urlPokemon)
        .then(respuesta => respuesta.json())
        .then(data => {
            const pokemon = {
                id: data.id,
                name: data.name,
                height: data.height,
                weight: data.weight,
                experience: data.base_experience,
                sprite: data.sprites.front_default,
            };
            mostrarPokemon(pokemon);
            
            if (localStorage.getItem(pokemon.id) !== null) {
                return;
            } else {
                localStorage.setItem(`${pokemon.id}`, JSON.stringify(pokemon));
                return;
            }
        })
}

function mostrarPokemon(pokemon) {
    const $contenedorPokemones = document.querySelector("#contenedor-pokemones");

    const nombrePokemon = pokemon.name;

    const $liPokemon = document.createElement("li");
    $liPokemon.id = `${pokemon.id}`;
    $liPokemon.classList = "col cuadro pokemon";

    const $img = document.createElement("img");
    $img.src = pokemon.sprite;

    const $h4 = document.createElement("h4");
    $h4.textContent = nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1);

    $liPokemon.appendChild($img);
    $liPokemon.appendChild($h4);
    $contenedorPokemones.appendChild($liPokemon);

    $liPokemon.addEventListener("click", mostrarInformacionPokemon);
}

function mostrarInformacionPokemon(e) {
    let pokemonSeleccionado = e.target;

    if (pokemonSeleccionado != "div") {
        pokemonSeleccionado = e.target.parentNode;
    }

    const pokemon = JSON.parse(localStorage.getItem(`${pokemonSeleccionado.id}`));

    if (pokemon === null) {
        return;
    }

    abrirModal();

    const nombrePokemon = pokemon.name;

    const $img = document.createElement("img");
    $img.src = pokemon.sprite;

    const $contenedorPokemon = document.querySelector("#contenedor-img");
    $contenedorPokemon.appendChild($img);

    document.querySelector("#nombre-pokemon").textContent = nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1);
    document.querySelector("#altura-pokemon").textContent = `${pokemon.height}`;
    document.querySelector("#peso-pokemon").textContent = `${pokemon.weight}`;
    document.querySelector("#experiencia-pokemon").textContent = `${pokemon.experience}`;
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
    localStorage.clear();
    offset += 20;

    obtenerLinksPokemones();
    borrarPokemonesAnteriores();
}

const $botonAtras = document.querySelector("#boton-atras");
$botonAtras.onclick = mostrarPokemonesAnteriores;

function mostrarPokemonesAnteriores() {
    if (offset === 0) {
        return false;
    }

    localStorage.clear();   
    offset -= 20;

    obtenerLinksPokemones();
    borrarPokemonesAnteriores();
}

function borrarPokemonesAnteriores() {
    const $cuadros = document.querySelectorAll(".cuadro");

    for (let i = 0; i < 20; i++) {
        $cuadros[i].remove();
    }
}
