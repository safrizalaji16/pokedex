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
  const [searchQuery, setSearchQuery] = useState("");

  const getPokemon = async () => {
    try {
      setLoading(true);
      const { data }: any = await axios.get(
        `https://radiant-memory-74a112d52a.strapiapp.com/api/pokemon/getAllPokemon?limit=10&offset=${offset}`
      );

      setPokemonData(data);
    } catch (error: any) {
      toast.error("Gagal mengambil data Pokemon");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://radiant-memory-74a112d52a.strapiapp.com/api/pokemon/searchPokemonByName?search=${searchQuery}`
      );

      setPokemonData(data);
    } catch (error) {
      toast.error("Failed to search Pokémon");
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

      <form className="mb-4 w-[80vw] mx-auto" onSubmit={handleSearchSubmit}>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Input pokemon name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center">
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
