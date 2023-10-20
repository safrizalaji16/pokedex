export const Header: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="flex items-center justify-between mx-4 my-4">
      <div>
        <h1 className="text-4xl font-bold">Pokedex</h1>
      </div>
      <div className="text-lg font-semibold">{name}</div>
    </div>
  );
};
