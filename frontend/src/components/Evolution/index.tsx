import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import capitalizeName from "@/helpers/CapitalizeName";
import Loader from "../Loader";

export const Evolution = ({ name, type }: any) => {
  const [evolutions, setEvolutions] = useState<any>(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const { data } = await axios.get(
        `https://radiant-memory-74a112d52a.strapiapp.com/api/pokemon/getAllEvolutions?name=${name}`
      );

      setEvolutions(data);
    } catch (error: any) {
      toast.error("Gagal mengambil data Pokemon");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvolutions();
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex mt-3 flex-wrap">
        {loading && <Loader />}
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
