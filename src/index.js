let informacionPokemones;
let contadorPokemones = 0;
const linksPokemones = [];
const API_URL = ('https://pokeapi.co/api/v2/pokemon/?limit=1302&offset=');

obtenerLinksPokemones();

function obtenerLinksPokemones() {
    fetch(API_URL)
        .then(respuesta => respuesta.json())
        .then(data => {
            informacionPokemones = data.results;
            procesarInformacion(informacionPokemones);
        })
        .catch(error => {console.error('Error al obtener datos:', error)});
}

function procesarInformacion(informacionPokemones) {
    let idPokemon = 0;

    Object.keys(informacionPokemones).forEach((key) => {
        const informacionPokemon = {
            id: idPokemon +=1,
            name: informacionPokemones[key].name,
            url: informacionPokemones[key].url
        }

        linksPokemones.push(informacionPokemon);
    });
    mostrarPokemones();
}

function mostrarPokemones() {
    for (let i = 0; i < 20; i++) {
        crearContenedorPokemon();
    }
}

function crearContenedorPokemon() {
    contadorPokemones++;

    const $contenedorPokemones = document.querySelector("#contenedor-pokemones");

    const nombrePokemon = linksPokemones[contadorPokemones - 1].name;

    const $liPokemon = document.createElement("li");
    $liPokemon.id = `${linksPokemones[contadorPokemones - 1].id}`;
    $liPokemon.classList = "col cuadro pokemon";

    const $img = document.createElement("img");
    $img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${contadorPokemones}.png`;

    const $h4 = document.createElement("h4");
    $h4.textContent = nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1);

    $liPokemon.appendChild($img);
    $liPokemon.appendChild($h4);
    $contenedorPokemones.appendChild($liPokemon);

    $liPokemon.addEventListener("click", mostrarInformacionPokemon);
}

const $botonSiguiente = document.querySelector("#boton-siguiente");
$botonSiguiente.onclick = mostrarPokemonesSiguientes;

function mostrarPokemonesSiguientes() {
    borrarPokemonesAnteriores();
    mostrarPokemones();
}

const $botonAtras = document.querySelector("#boton-atras");
$botonAtras.onclick = mostrarPokemonesAnteriores;

function mostrarPokemonesAnteriores() {
    if (document.querySelector("#contenedor-pokemones li:last-child").id === "20") {
        return false;
    }
   
    contadorPokemones -= 40;
    borrarPokemonesAnteriores();
    mostrarPokemones();
}

function borrarPokemonesAnteriores() {
    const $cuadros = document.querySelectorAll(".cuadro");

    for (let i = 0; i < 20; i++) {
        $cuadros[i].remove();
    }
}

function mostrarInformacionPokemon(e) {
    let pokemonSeleccionado = e.target;

    if (pokemonSeleccionado != "li") {
        pokemonSeleccionado = e.target.closest("li");
    }

    const URL_POKEMON = informacionPokemones[parseInt(pokemonSeleccionado.id) -1].url;

    fetch(URL_POKEMON)
        .then(respuesta => respuesta.json())
        .then(dataPokemon => {
            console.log(dataPokemon);

            const nombrePokemon = dataPokemon.name;

            const $img = document.createElement("img");
            $img.src = dataPokemon.sprites.front_default;

            const $contenedorPokemon = document.querySelector("#contenedor-img");
            $contenedorPokemon.appendChild($img);

            document.querySelector("#nombre-pokemon").textContent = nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1);
            document.querySelector("#altura-pokemon").textContent = `${dataPokemon.height}`;
            document.querySelector("#peso-pokemon").textContent = `${dataPokemon.weight}`;
            document.querySelector("#experiencia-pokemon").textContent = `${dataPokemon.base_experience}`;

        })
        .catch(error => {console.error("Error al obtener datos:", error)})

    abrirModal();
}

const $modal = document.querySelector(".modal");
$modal.addEventListener("click", cerrarModal);

function abrirModal() {
    document.querySelector(".modal").classList.remove("oculto");

    const $cuadrosPokemones = document.querySelectorAll("li");
    

    for (let i = 0; i < $cuadrosPokemones.length; i++) {
        $cuadrosPokemones[i].removeEventListener("click", mostrarInformacionPokemon);
    }
}

function cerrarModal() {
    document.querySelector(".modal").classList.add("oculto");
    document.querySelector("#contenedor-img img").remove();

    const $cuadrosPokemones = document.querySelectorAll("li");

    for (let i = 0; i < $cuadrosPokemones.length; i++) {
        $cuadrosPokemones[i].addEventListener("click", mostrarInformacionPokemon);
    }
}
