"use client";
import React from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  return (
    <div className="p-5 border shadow-sm">
      <div className="flex items-center justify-between">
        <Image src="/logo.svg" width={50} height={50} alt="logo" />
        <h2 className="font-bold">Developers Dashboard</h2>
        <Link href={'/dashboard'}>
        <Button>Get Started</Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
