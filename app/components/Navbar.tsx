import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center shadow-lg">
      <Link href="/" className="text-2xl font-bold hover:text-gray-400 transition duration-200">
        Wontech Web
      </Link>
      <div className="flex gap-8">
        <Link href="/page2" className="text-lg hover:text-gray-400 transition duration-200">
          Página 2
        </Link>
        <Link href="/page3" className="text-lg hover:text-gray-400 transition duration-200">
          Página 3
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
