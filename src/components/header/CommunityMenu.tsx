import React from 'react';
import Link from 'next/link';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuContentItem,
} from '../ui/navigation-menu';
import { community } from './data';

const CommunityMenu: React.FC = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-[#187A25] hover:text-[#4CD23D] data-[state=open]:bg-[#2C8E2C]/10 bg-transparent">
        Comunidad
      </NavigationMenuTrigger>
      <NavigationMenuContent className="w-56 bg-white border-[#165C1E] shadow-lg left-0">
        <NavigationMenuContentItem className="text-[#187A25] p-4 font-semibold">
          Únete a la Comunidad
        </NavigationMenuContentItem>
        {community.map((item) => (
          <NavigationMenuContentItem key={item.title} className="p-0">
            <Link href={item.href} className="block w-full p-4 text-[#187A25] hover:bg-[#4CD23D]/10 hover:text-[#4CD23D]">
              {item.title}
            </Link>
          </NavigationMenuContentItem>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default CommunityMenu;
