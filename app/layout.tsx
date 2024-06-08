import React, { ReactNode } from "react";
import "./globals.css";
import Header from "./_components/Header";
import SideNav from "./dashboard/_components/SideNav";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props): JSX.Element {
  return (
    <html lang="en" data-theme="aqua">
      <body className="bg-gray-900 text-white">
        <Header />
        <div className="flex">
          <div>
            <SideNav />
          </div>
          <div className="flex-1 flex items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
