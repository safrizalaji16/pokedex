import capitalizeName from "@/helpers/CapitalizeName";

interface AboutProps {
  species: any;
  height: number;
  weight: number;
  abilities: string[];
}

export const About: React.FC<AboutProps> = ({
  species,
  height,
  weight,
  abilities,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr>
              <td className="p-4">Species</td>
              <td
                scope="row"
                className="p-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {capitalizeName(species)}
              </td>
            </tr>
            <tr>
              <td className="p-4">Height</td>
              <td
                scope="row"
                className="p-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {height}
              </td>
            </tr>
            <tr>
              <td className="p-4">Weight</td>
              <td
                scope="row"
                className="p-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {weight}
              </td>
            </tr>
            <tr>
              <td className="p-4">Abilities</td>
              <td
                scope="row"
                className="p-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {abilities?.join(", ")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
