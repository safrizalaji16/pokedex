"use strict";

/**
 * pokemon controller
 */
const axios = require("axios");
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::pokemon.pokemon", ({ strapi }) => ({
  async searchPokemonByName(ctx) {
    try {
      const { search } = ctx.query;
      const pokemon = await strapi.db.query("api::pokemon.pokemon").findMany({
        where: {
          name: {
            $containsi: search,
          },
        },
      });

      return pokemon;
    } catch (error) {
      console.log(error);
    }
  },
  async getPokemonByName(ctx) {
    try {
      const { name } = ctx.query;
      const pokemon = await strapi.db.query("api::pokemon.pokemon").findOne({
        where: { name: name },
      });

      return pokemon;
    } catch (error) {
      console.log(error);
    }
  },
  async getAllEvolutions(ctx) {
    try {
      const { name } = ctx.query;
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${name}`
      );

      const evo = await axios.get(data.evolution_chain.url);

      const collectEvolutions = (chain, result = []) => {
        result.push(chain.species.name);
        if (chain.evolves_to && chain.evolves_to.length > 0) {
          return collectEvolutions(chain.evolves_to[0], result);
        }
        return result;
      };

      const evolutionNames = collectEvolutions(evo.data.chain);
      return evolutionNames;
    } catch (error) {
      console.log(error);
    }
  },
  async getAllPokemon(ctx) {
    try {
      const { limit, offset } = ctx.query;
      let { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit || 10}&offset=${
          offset || 0
        }`
      );

      for (let i = 0; i < data.results.length; i++) {
        const name = data.results[i].name;
        const url = data.results[i].url;
        const { data: detail } = await axios.get(url);
        const pokemon = await strapi.db.query("api::pokemon.pokemon").findOne({
          where: { name: name },
        });

        if (!pokemon) {
          await strapi.query("api::pokemon.pokemon").create({
            data: {
              name,
              detail,
            },
          });
        }

        data.results[i].detail = detail;
      }

      return data.results;
    } catch (error) {
      console.log(error);
    }
  },
  async deleteAllPokemon(ctx) {
    try {
      await strapi.db.query("api::pokemon.pokemon").deleteMany();

      return { msg: "All pokemons deleted" };
    } catch (error) {
      console.log(error);
    }
  },
}));
