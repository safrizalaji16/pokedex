import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import type { MouseEventHandler } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import Auth from "@/templates/Auth";
import Loader from "@/components/Loader";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit: MouseEventHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://radiant-memory-74a112d52a.strapiapp.com/api/auth/local/register",
        {
          username,
          email,
          password,
        }
      );
      setEmail("");
      setUsername("");
      setPassword("");
      localStorage.setItem("token", data.jwt);
      toast.success(`Welcome, ${data.user.username}!`);
      router.push("/home");
    } catch (e) {
      toast.error("Sorry we have some issues!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Auth>
      {loading && <Loader />}
      <h1 className="text-3xl font-bold text-shadow">Welcome!</h1>
      <span>Please register below.</span>
      <span>
        Already have an account? You can{" "}
        <a
          className="underline text-primary ml-0"
          onClick={() => router.push("/auth/login")}
        >
          login here!
        </a>
      </span>
      <div className="grid gap-2">
        <input
          value={username}
          className="rounded-lg p-2"
          onChange={(e) => setUsername(e.target.value)}
          placeholder={"Username"}
          type="text"
        />

        <input
          value={email}
          className="rounded-lg p-2"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Email"}
          type="email"
        />

        <input
          value={password}
          className="rounded-lg p-2"
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"Password"}
          type="password"
        />
      </div>

      <div className="grid gap-2 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </Auth>
  );
};

export default Login;
