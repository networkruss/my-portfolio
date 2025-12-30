import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-5 bg-black text-white">
      <h1 className="text-xl font-bold">MyPortfolio</h1>

      <ul className="flex gap-5">
        <li><Link href="/" className="hover:underline">Home</Link></li>
        <li><Link href="/projects" className="hover:underline">Projects</Link></li>
        <li><Link href="/about" className="hover:underline">About</Link></li>
        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
      </ul>
    </nav>
  );
}
