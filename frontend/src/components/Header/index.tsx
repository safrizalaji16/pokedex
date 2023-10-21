import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdExpandMore } from "react-icons/md";

export const Header = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const signOut = () => {
    localStorage.clear();
    router.push("/auth/login");
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        setUsername(user);
      } else {
        router.push("/auth/login");
      }
    }
  }, [router]);

  return (
    <div className="flex items-center justify-between mx-4 my-4">
      <div>
        <h1 className="text-4xl font-bold">Pokedex</h1>
      </div>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 focus:ring-offset-gray-100 z-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p className="text-lg font-semibold flex items-center">
              {username || "Admin"}
              <span>
                <MdExpandMore className="m-1" />
              </span>
            </p>
          </button>
        </div>
        <div
          className={`origin-top-right relative right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-opacity-5 ${
            isOpen ? "" : "hidden"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="text-center font-bold text-slate-600">
            <button
              type="button"
              className="text-center p-1 text-sm z-50"
              role="menuitem"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
