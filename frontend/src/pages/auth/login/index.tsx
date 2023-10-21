import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import type { MouseEventHandler } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import Auth from "@/templates/Auth";
import Link from "next/link";
import Loader from "@/components/Loader";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit: MouseEventHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:1337/api/auth/local",
        {
          identifier: email,
          password,
        }
      );

      setEmail("");
      setPassword("");
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", data.user.username);
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
      <span>Please login below.</span>
      <span>
        Don't have an account yet? You can{" "}
        <a
          className="underline text-primary ml-0"
          onClick={() => router.push("/auth/register")}
        >
          register here!
        </a>
      </span>

      <div className="grid gap-2">
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
