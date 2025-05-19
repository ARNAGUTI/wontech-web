import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex-1">
        <Link href="/" className="text-2xl font-bold">
          Wontech Web
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <Link href="/page2" className="mx-4">
          Página 2
        </Link>
      </div>
      <div className="flex-1 flex justify-end">
        <Link href="/page3" className="mx-4">
          Página 3
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
