export async function obtenerPokemones() {
    const limit = 1302;
    const offset = 0;
    const API_URL = (`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);

    return fetch(API_URL)
        .then((r) => r.json())
        .then((r) => r.results);
}
