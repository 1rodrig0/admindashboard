import React from 'react';
import Image from 'next/image';
import logo from '../../../public/logoCompleto.png';
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
import { Menu, Search } from 'lucide-react';
import GenreMenu from './components/GenreMenu';
import CommunityMenu from './components/CommunityMenu';
import CreateMenu from './components/CreateMenu';
import { genres, community, createOptions } from './data';
import styles from './styles/header.module.css';

interface MenuItem {
  title: string;
  href: string;
}

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo - Left */}
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              src={logo}
              alt="Comunidad Lectora Bolivia"
              width={120}
              height={40}
              className={styles.logo}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        <nav className={styles.desktopNav}>
          <NavigationMenu>
            <NavigationMenuList className={styles.navList}>
              <GenreMenu />
              <CommunityMenu />
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Search - Center, Hidden on Small Mobile */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <Input
              type="search"
              placeholder="Buscar historias, autores bolivianos..."
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Right Actions - Desktop */}
        <div className={styles.actionsContainer}>
          <CreateMenu />
          <Button variant="outline" asChild className={`${styles.button} ${styles.buttonText}`}>
            <Link href="/login">
              Iniciar sesión
            </Link>
          </Button>
          <Button variant="outline" asChild className={`${styles.button} ${styles.buttonText}`}>
            <Link href="/register">
              Registrate
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className={styles.mobileMenu}>
          <div className={styles.mobileSearchContainer}>
            <div className={styles.mobileSearchWrapper}>
              <Search className={styles.searchIcon} />
              <Input
                type="search"
                placeholder="Buscar..."
                className={styles.searchInput}
              />
            </div>
          </div>
          <DropdownMenuProvider>
            <DropdownMenuTrigger className={styles.menuTrigger}>
              <Menu className={styles.menuIcon} />
            </DropdownMenuTrigger>
            <DropdownMenuContent floating className={styles.dropdownContent}>
              <DropdownMenuItem asChild>
                <Link href="/explore" className={styles.dropdownItem}>
                  Explora
                </Link>
              </DropdownMenuItem>
              {genres.map((item: MenuItem) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link href={item.href} className={`${styles.dropdownItem} ${styles.dropdownItemIndented}`}>
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/community" className={styles.dropdownItem}>
                  Comunidad
                </Link>
              </DropdownMenuItem>
              {community.map((item: MenuItem) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link href={item.href} className={`${styles.dropdownItem} ${styles.dropdownItemIndented}`}>
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/create" className={styles.dropdownItem}>
                  Crear una historia nueva
                </Link>
              </DropdownMenuItem>
              {createOptions.map((item: MenuItem) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link href={item.href} className={`${styles.dropdownItem} ${styles.dropdownItemIndented}`}>
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/login" className={styles.dropdownItem}>
                  Iniciar sesión
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register" className={styles.dropdownItem}>
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
