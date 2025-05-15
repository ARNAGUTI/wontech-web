import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white py-3 px-8 flex justify-between items-center fixed top-0 z-50">
      <Link href="/" className="text-2xl font-bold hover:text-gray-400 transition">
        Wontech Web
      </Link>
      <div className="flex gap-8 text-lg">
        <Link href="/page2" className="hover:text-gray-400 transition">
          Página 2
        </Link>
        <Link href="/page3" className="hover:text-gray-400 transition">
          Página 3
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
