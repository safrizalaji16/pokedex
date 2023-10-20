import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import capitalizeName from "@/helpers/CapitalizeName";
import formatNumber from "@/helpers/FormatNumber";
import { About } from "@/components/About";
import { BaseStats } from "@/components/BaseStats";
import { Moves } from "@/components/Moves";
import { Evolution } from "@/components/Evolution";

const Detail = () => {
  const router = useRouter();
  const { name } = router.query;
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [activeMenuItem, setActiveMenuItem] = useState("About");

  const pokemonColors: any = {
    normal: "#B5B9C4",
    fighting: "#EB4971",
    flying: "#83A2E3",
    poison: "#9F6E97",
    ground: "#F78551",
    rock: "#D4C294",
    bug: "#8BD674",
    ghost: "#8571BE",
    steel: "#4C91B2",
    fire: "#FFA756",
    water: "#58ABF6",
    grass: "#8BBE8A",
    electric: "#F2CB55",
    psychic: "#FF6568",
    ice: "#91D8DF",
    dragon: "#7383B9",
    dark: "#6F6E78",
    fairy: "#EBA8C3",
  };

  const cardStyle = {
    backgroundColor: pokemonData
      ? pokemonColors[pokemonData.types[0].type.name]
      : "#FFFFFF",
  };

  const abilities = pokemonData?.abilities.map((el: any) => {
    return capitalizeName(el.ability.name);
  });

  const moves = pokemonData?.moves.map((el: any) => {
    return capitalizeName(el.move.name);
  });

  const getPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemonData(response.data);
    } catch (error) {
      console.error("Gagal mengambil data Pokemon:", error);
    }
  };

  useEffect(() => {
    getPokemon();
  }, [name]);
  console.log(pokemonData, "ASASF");

  return (
    <div style={cardStyle} className="min-h-screen">
      <div className="min-h-[calc(50vh-64px)] md:min-h-full">
        <div className="flex justify-between items-center p-4 mx-2">
          <div className="text-center md:text-left md:mb-0">
            <h1 className="text-4xl font-bold text-white">
              {typeof name === "string" ? capitalizeName(name) : ""}
            </h1>
            <div className="flex mt-3">
              {pokemonData?.types.map((type: any, index: number) => (
                <div
                  key={index}
                  className="bg-white opacity-40 rounded-full px-4 py-1 mr-2"
                >
                  <h1 className="text-xs font-semibold">
                    {type.type.name.charAt(0).toUpperCase() +
                      type.type.name.slice(1)}
                  </h1>
                </div>
              ))}
            </div>
          </div>
          <h1 className="text-xl font-semibold text-white mt-4 md:mt-0">
            {formatNumber(pokemonData?.id)}
          </h1>
        </div>
        <img
          className="w-48 h-48 mx-auto block xl:w-96 xl:h-96"
          src={pokemonData?.sprites.other["official-artwork"]["front_default"]}
          alt={pokemonData?.name}
        />
        <div className="bg-white min-h-[calc(50vh-64px)] rounded-t-xl flex justify-center">
          <div className="p-4 mx-2">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-no-wrap -mb-px">
                <li className="mr-2 flex-shrink-0">
                  <a
                    className={`inline-block p-2 border-b-2 rounded-t-lg ${
                      activeMenuItem === "About"
                        ? "active dark:text-blue-500 dark:border-blue-500 border-blue-600"
                        : ""
                    }`}
                    onClick={() => setActiveMenuItem("About")}
                  >
                    About
                  </a>
                </li>
                <li className="mr-2 flex-shrink-0">
                  <a
                    className={`inline-block p-2 border-b-2 rounded-t-lg ${
                      activeMenuItem === "Base Stats"
                        ? "active dark:text-blue-500 dark:border-blue-500 border-blue-600"
                        : ""
                    }`}
                    aria-current="page"
                    onClick={() => setActiveMenuItem("Base Stats")}
                  >
                    Base Stats
                  </a>
                </li>
                <li className="mr-2 flex-shrink-0">
                  <a
                    className={`inline-block p-2 border-b-2 rounded-t-lg ${
                      activeMenuItem === "Evolution"
                        ? "active dark:text-blue-500 dark:border-blue-500 border-blue-600"
                        : ""
                    }`}
                    onClick={() => setActiveMenuItem("Evolution")}
                  >
                    Evolution
                  </a>
                </li>
                <li className="flex-shrink-0">
                  <a
                    className={`inline-block p-2 border-b-2 rounded-t-lg ${
                      activeMenuItem === "Moves"
                        ? "active dark:text-blue-500 dark:border-blue-500 border-blue-600"
                        : ""
                    }`}
                    onClick={() => setActiveMenuItem("Moves")}
                  >
                    Moves
                  </a>
                </li>
              </ul>
            </div>
            {activeMenuItem === "About" ? (
              <About
                species={pokemonData?.types[0].type.name}
                height={pokemonData?.height}
                weight={pokemonData?.weight}
                abilities={abilities}
              />
            ) : activeMenuItem === "Base Stats" ? (
              <BaseStats stats={pokemonData?.stats} />
            ) : activeMenuItem === "Evolution" ? (
              <Evolution id={pokemonData?.id} />
            ) : activeMenuItem === "Moves" ? (
              <Moves moves={moves} type={pokemonData?.types[0].type.name} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
