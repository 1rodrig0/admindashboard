import React from 'react';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '../../ui/navigation-menu';
import { community } from '../data';
import styles from '../styles/header.module.css';

const CommunityMenu: React.FC = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={`text-[#187A25] hover:text-[#4CD23D] data-[state=open]:bg-[#2C8E2C]/10 bg-transparent ${styles.menuText}`}>
        Comunidad
      </NavigationMenuTrigger>
      <NavigationMenuContent className="w-56 bg-white border-[#165C1E] shadow-lg left-0">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-[#187A25]">Únete a la Comunidad</h3>
        </div>
        <ul className="p-4 space-y-1">
          {community.map((item) => (
            <li key={item.title}>
              <NavigationMenuLink className="block w-full p-4 text-[#187A25] hover:bg-[#4CD23D]/10 hover:text-[#4CD23D]">
                {item.title}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default CommunityMenu;
