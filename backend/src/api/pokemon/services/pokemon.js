"use strict";

/**
 * pokemon service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::pokemon.pokemon", ({ strapi }) => ({
  async getAllPokemonService(ctx) {
    try {
      ctx.body = "ok";
    } catch (error) {
      console.log(error);
    }
  },
}));