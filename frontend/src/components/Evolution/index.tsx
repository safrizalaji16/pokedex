import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import capitalizeName from "@/helpers/CapitalizeName";

export const Evolution = ({ name, type }: any) => {
  const [evolutions, setEvolutions] = useState<any>(null);
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
    backgroundColor: type ? pokemonColors[type] : "#FFFFFF",
  };

  const getEvolutions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/pokemon/getAllEvolutions?name=${name}`
      );

      const evo: any = await axios.get(response?.data.evolution_chain.url);

      const collectEvolutions: any = (chain: any, result: any = []) => {
        result.push(chain.species.name);
        if (chain.evolves_to && chain.evolves_to.length > 0) {
          return collectEvolutions(chain.evolves_to[0], result);
        }
        return result;
      };

      const evolutionNames = collectEvolutions(evo.data.chain);
      setEvolutions(evolutionNames);
    } catch (error: any) {
      toast.error("Gagal mengambil data Pokemon");
    }
  };

  useEffect(() => {
    getEvolutions();
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex mt-3 flex-wrap">
        {evolutions?.map((el: any, index: number) => (
          <div
            key={index}
            className="rounded-lg self-start m-1 opacity-40"
            style={cardStyle}
          >
            <h1 className="text-black p-2">{capitalizeName(el)}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
