"use client";

import React from "react";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";

function Header() {
  const { data, status } = useSession();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogin = () => signIn();
  const handleMenu = () => setMenuOpen(!menuOpen);
  const handleLogout = () => {
    setMenuOpen(false);
    signOut();
  };

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
      <Link href="/">
        <Image src="/Logo.png" width={182} height={32} alt="logo" />
      </Link>
      {status === "unauthenticated" && (
        <button
          className="text-primary text-sm font-semibold"
          onClick={handleLogin}
        >
          Login
        </button>
      )}

      {status === "authenticated" && (
        <div className="flex items-center gap-3 border-primaryGrayLight border border-solid rounded-full p-2 px-3 relative">
          <AiOutlineMenu
            size={16}
            onClick={handleMenu}
            className="cursor-pointer"
          />
          <Image
            height={32}
            width={32}
            src={data.user?.image!}
            alt="user photo"
            className="rounded-full shadow-md"
          />
          {menuOpen && (
            <div className="z-50 absolute top-14 left-0 w-full h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
              <Link href="/my-trips" onClick={() => setMenuOpen(false)}>
                <button className="text-primary pb-2 border-b border-grayLighter border-solid text-sm font-semibold">
                  Minhas Viagens
                </button>
              </Link>

              <button
                className="text-primary pt-2 text-sm font-semibold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
