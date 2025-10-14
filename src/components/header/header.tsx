import React from 'react';
import Image from 'next/image';
import logo from '../../../public/logoCompleto.png'; // Use first asset as logo
import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  NavigationMenu,
  NavigationMenuList,
} from '../ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuProvider,
} from '../ui/dropdown-menu';
import { Menu, Search } from 'lucide-react'; // Assuming lucide-react is installed via shadcn
import GenreMenu from './GenreMenu';
import CommunityMenu from './CommunityMenu';
import CreateMenu from './CreateMenu';
import { genres, community, createOptions } from './data';

interface MenuItem {
  title: string;
  href: string;
}

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent px-4 py-3 md:px-6 lg:px-8">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo - Left */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src={logo}
              alt="Comunidad Lectora Bolivia"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="space-x-8">
              <GenreMenu />
              <CommunityMenu />
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Search - Center, Hidden on Small Mobile */}
        <div className="flex-1 max-w-md mx-4 hidden sm:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3F875F] h-4 w-4" />
            <Input
              type="search"
              placeholder="Buscar historias, autores bolivianos..."
              className="pl-10 pr-4 py-2 border-[#2C8E2C] focus:border-[#4CD23D] focus:ring-[#4CD23D] text-[#187A25]"
            />
          </div>
        </div>

        {/* Right Actions - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <CreateMenu />
          <Button variant="outline" asChild className="border-[#187A25] text-[#187A25] hover:bg-[#4CD23D] hover:text-white">
            <Link href="/login">
              Iniciar sesión
            </Link>
          </Button>
          <Button variant="outline" asChild className="border-[#187A25] text-[#187A25] hover:bg-[#4CD23D] hover:text-white">
            <Link href="/register">
              Registrate
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <div className="flex-1 max-w-xs mr-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3F875F] h-4 w-4" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 border-[#2C8E2C] focus:border-[#4CD23D] focus:ring-[#4CD23D] text-[#187A25]"
              />
            </div>
          </div>
          <DropdownMenuProvider>
            <DropdownMenuTrigger className="text-[#187A25] hover:text-[#4CD23D] p-2 rounded-md">
              <Menu className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent floating className="w-64 bg-white border-[#165C1E] shadow-lg mr-4">
              <DropdownMenuItem asChild>
                <Link href="/explore" className="text-[#187A25] hover:bg-[#4CD23D]/10 block w-full text-left px-4 py-2">
                  Explora
                </Link>
              </DropdownMenuItem>
              {genres.map((item: MenuItem) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link href={item.href} className="text-[#187A25] hover:bg-[#4CD23D]/10 block w-full text-left px-8 py-2">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/community" className="text-[#187A25] hover:bg-[#4CD23D]/10 block w-full text-left px-4 py-2">
                  Comunidad
                </Link>
              </DropdownMenuItem>
              {community.map((item: MenuItem) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link href={item.href} className="text-[#187A25] hover:bg-[#4CD23D]/10 block w-full text-left px-8 py-2">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/create" className="text-[#187A25] hover:bg-[#4CD23D]/10 block w-full text-left px-4 py-2">
                  Crear una historia nueva
                </Link>
              </DropdownMenuItem>
              {createOptions.map((item: MenuItem) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link href={item.href} className="text-[#187A25] hover:bg-[#4CD23D]/10 block w-full text-left px-8 py-2">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/login" className="text-[#187A25] hover:bg-[#4CD23D]/10 block w-full text-left px-4 py-2">
                  Iniciar sesión
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register" className="text-[#187A25] hover:bg-[#4CD23D]/10 block w-full text-left px-4 py-2">
                  Registrate
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuProvider>
        </div>
      </div>
    </header>
  );
};

export default Header;
