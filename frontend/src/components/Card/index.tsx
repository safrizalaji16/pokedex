import { useRouter } from "next/router";
import bgImg from "../../../public/Pokeball_card.png";
import { useEffect, useState } from "react";
import capitalizeName from "@/helpers/CapitalizeName";
import Image from "next/image";
import bgPokemon from "../../../public/Pokeball_card.png";

interface CardProps {
  pokemon: any;
}

export const Card: React.FC<CardProps> = ({ pokemon }) => {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/detail/${pokemon.name}`);
  };
  const [pokemonData, setPokemonData] = useState<any>(null);

  useEffect(() => {
    setPokemonData(pokemon.detail);
  }, [pokemon]);

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

  return (
    <div
      className="bg-white p-2 rounded shadow-md w-36 h-32 bg-white p-4 rounded-xl shadow-md"
      style={cardStyle}
      onClick={handleCardClick}
    >
      <div className="flex flex-col items-start justify-between h-full">
        <h1 className="text-lg font-semibold text-white">
          {capitalizeName(pokemon.name)}
        </h1>
        <div className="flex justify-around">
          <div className="flex flex-col">
            {pokemonData?.types.map((type: any, index: number) => {
              const typePokemon =
                type.type.name.charAt(0).toUpperCase() +
                type.type.name.slice(1);
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    opacity: 0.4,
                    borderRadius: 10,
                    alignSelf: "baseline",
                    margin: 1,
                  }}
                >
                  <h1
                    style={{
                      color: "black",
                      paddingTop: 5,
                      paddingRight: 5,
                      paddingBottom: 5,
                      paddingLeft: 5,
                      opacity: 1,
                    }}
                    className="text-xs"
                  >
                    {typePokemon}
                  </h1>
                </div>
              );
            })}
          </div>
          <Image
            src={
              pokemonData?.sprites.other["official-artwork"]["front_default"]
            }
            width={85}
            height={85}
            alt={pokemon.name}
          />
        </div>
      </div>
    </div>
  );
};
