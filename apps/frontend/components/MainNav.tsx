import { Logo } from './Logo';

export default function MainNav() {
  return (
    <header>
      <nav className="bg-[#1C1C1C] text-white flex flex-col  p-2 border-b border-gray-600">
        <Logo />
      </nav>
    </header>
  );
}
