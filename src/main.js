const contenedorPokemones = document.querySelector('#contenedor-pokemones');

let limit = 20;
let offset = 1;

function obtenerPokemones(offset, limit) {
    for (let i = offset; i < offset + limit; i++) {
        obtenerPokemon(i);
    }
}

function obtenerPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            crearPokemon(data);
        });
}

function crearPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');

    const contenedorPokemon = document.createElement('article');
    contenedorPokemon.classList.add('pokemon');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;

    const pokemonNombre = document.createElement('p');
    pokemonNombre.textContent = pokemon.name;

    const pokemonNumero = document.createElement('p');
    pokemonNumero.textContent = `#${pokemon.id.toString().padStart(4, 0)}`;

    contenedorPokemon.appendChild(sprite);
    contenedorPokemon.appendChild(pokemonNombre);
    contenedorPokemon.appendChild(pokemonNumero);

    contenedorPokemones.appendChild(contenedorPokemon);
}

obtenerPokemones(offset, limit);
