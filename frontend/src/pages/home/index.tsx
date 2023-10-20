import React, { useEffect, useState } from "react";
import { BaseMain } from "@/templates/Main";
import axios from "axios";
import { Card } from "@/components/Card";
import { toast } from "react-toastify";

const Home = () => {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";
  const [pokemonData, setPokemonData] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");

  const getPokemon = async (url: string) => {
    try {
      const response = await axios.get(url);
      setPokemonData(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
    } catch (error: any) {
      toast.error("Gagal mengambil data Pokemon");
    }
  };

  const handleNext = () => {
    if (nextPage) {
      getPokemon(nextPage);
    }
  };

  const handlePrevious = () => {
    if (previousPage) {
      getPokemon(previousPage);
    }
  };

  useEffect(() => {
    getPokemon(apiUrl);
  }, []);

  return (
    <BaseMain>
      <div className="flex items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mx-auto justify-center">
          {pokemonData.map((pokemon, index) => (
            <Card key={index} pokemon={pokemon} />
          ))}
        </div>
      </div>
      <div className="button-container mt-4 mb-4 flex justify-center space-x-4">
        {previousPage && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handlePrevious}
          >
            Prev
          </button>
        )}
        {nextPage && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </BaseMain>
  );
};

export default Home;
