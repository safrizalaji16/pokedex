import { Header } from "@/components/Header";
import { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

export const BaseMain = ({ children }: MainProps) => {
  return (
    <div id="mainLayout" className="min-h-screen bg-grey-300">
      <Header name="safrizal" />

      <div className="min-h-[calc(100vh-64px)] md:min-h-full mx-2">
        {children}
      </div>
    </div>
  );
};
