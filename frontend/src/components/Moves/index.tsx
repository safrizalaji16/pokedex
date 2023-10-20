import React from "react";

export const Moves = ({ moves, type }: { moves: string[]; type: string }) => {
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

  return (
    <div className="flex items-center justify-between">
      <div className="flex mt-3 flex-wrap">
        {moves.map((el, index) => (
          <div
            key={index}
            className="rounded-lg self-start m-1 opacity-40"
            style={cardStyle}
          >
            <h1 className="text-black p-2">{el}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
