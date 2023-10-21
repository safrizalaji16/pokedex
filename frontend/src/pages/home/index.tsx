import React, { useEffect, useState } from "react";
import { BaseMain } from "@/templates/Main";
import axios from "axios";
import { Card } from "@/components/Card";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPokemon = async () => {
    try {
      setLoading(true);
      const response: any = await axios.get(
        `http://localhost:1337/api/pokemon/getAllPokemon?limit=10&offset=${offset}`
      );
      console.log(response);

      setPokemonData(response.data);
    } catch (error: any) {
      toast.error("Gagal mengambil data Pokemon");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setOffset(offset + 10);
  };

  const handlePrevious = () => {
    setOffset(offset - 10);
  };

  useEffect(() => {
    getPokemon();
  }, [offset]);

  return (
    <BaseMain>
      {loading && <Loader />}
      <div className="flex items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mx-auto justify-center">
          {pokemonData?.map((pokemon, index) => (
            <Card key={index} pokemon={pokemon} />
          ))}
        </div>
      </div>
      <div className="button-container mt-4 mb-4 flex justify-center space-x-4">
        {offset > 0 && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handlePrevious}
          >
            Prev
          </button>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </BaseMain>
  );
};

export default Home;
