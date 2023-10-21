import type { ReactNode } from "react";
import Image from "next/image";
import pokemon from "../../public/pokebal.png";

type AuthProps = {
  children: ReactNode;
};

const Auth = ({ children }: AuthProps) => (
  <div className="flex min-h-screen w-screen items-center justify-center overflow-y-auto bg-primary">
    <div className="my-16 grid h-auto w-[32rem] gap-2 rounded-lg bg-light p-5">
      <div className="h-[62px] w-12 rounded-full bg-transparent">
        <Image
          src={pokemon}
          style={{ margin: "0 auto", height: "auto", width: "auto" }}
          alt="Pokemon"
        />
      </div>
      {children}
    </div>
  </div>
);

export default Auth;
