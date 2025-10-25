import Link from 'next/link';

export default function CitizenNavbar() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/citizen-dashboard">
          <h1 className="text-2xl font-bold text-green-800 cursor-pointer">
            EcoConnect
          </h1>
        </Link>
      </nav>
    </header>
  );
}