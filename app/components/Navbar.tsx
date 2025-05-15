"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link href="/">Wontech Web</Link>
      </div>
      <div className="flex gap-4">
        <Link href="/page2" className="hover:text-gray-400">
          Página 2
        </Link>
        <Link href="/page3" className="hover:text-gray-400">
          Página 3
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
