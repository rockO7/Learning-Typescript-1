import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="SpinTech Logo" width={32} height={32} />
          <span className="font-bold text-lg">SpinTech Finance</span>
        </Link>

        <nav className="flex gap-6 text-sm font-medium">
          <Link href="#" className="opacity-80 hover:opacity-100">
            Dashboard
          </Link>
          <Link href="#" className="opacity-80 hover:opacity-100">
            Reports
          </Link>
          <Link href="#" className="opacity-80 hover:opacity-100">
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
}
