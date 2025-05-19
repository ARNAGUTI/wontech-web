import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white py-3 px-8 flex items-center fixed top-0 z-50">
      <div className="flex-1">
        <Link href="/" className="text-2xl font-bold hover:text-gray-400 transition">
          Wontech Web
        </Link>
      </div>

      <div className="flex-1 flex justify-center text-lg">
        <Link href="/page2" className="hover:text-gray-400 transition">
          Página 2
        </Link>
      </div>

      <div className="flex-1 flex justify-end text-lg">
        <Link href="/page3" className="hover:text-gray-400 transition">
          Página 3
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
