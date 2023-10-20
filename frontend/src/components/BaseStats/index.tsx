import React from "react";

interface Stat {
  stat: {
    name: string;
  };
  base_stat: number;
}

interface BaseStatsProps {
  stats: Stat[];
}

export const BaseStats: React.FC<BaseStatsProps> = ({ stats }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {stats.map((el: Stat, index: number) => (
              <tr key={index}>
                <td className="p-4">{el.stat.name}</td>
                <td className="p-4 font-medium text-gray-900">
                  {el.base_stat}
                </td>
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="w-[30vw] bg-gray-200 rounded-full h-1">
                      <div
                        className={`${
                          (el.base_stat / 100) * 100 < 50
                            ? "bg-red-400"
                            : "bg-green-400"
                        } h-1 rounded-full`}
                        style={{
                          width: `${(el.base_stat / 100) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
