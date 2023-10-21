module.exports = {
  routes: [
    {
      method: "GET",
      path: "/pokemon/getAllPokemon",
      handler: "pokemon.getAllPokemon",
    },
    {
      method: "GET",
      path: "/pokemon/getPokemonByName",
      handler: "pokemon.getPokemonByName",
    },
    {
      method: "GET",
      path: "/pokemon/getAllEvolutions",
      handler: "pokemon.getAllEvolutions",
    },
    {
      method: "DELETE",
      path: "/pokemon/deleteAllPokemon",
      handler: "pokemon.deleteAllPokemon",
    },
  ],
};
