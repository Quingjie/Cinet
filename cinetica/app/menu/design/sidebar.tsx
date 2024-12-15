import React, { PropsWithChildren, useState, useEffect } from "react";
import { 
  BookmarkCheck, 
  MonitorPlay, 
  Popcorn, 
  Telescope, 
  UserRound, 
  LogOut, 
  Moon, 
  Sun, 
  Monitor, 
  X,
  MenuIcon
} from "lucide-react";
import { useTheme } from '../theme-provider';
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

interface SidebarProps extends PropsWithChildren {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  isSmallScreen?: boolean;
}

const menuItems = {
  movies: [
    {
      title: "Now playing",
      href: "/menu/movie/now-playing",
      icon: Popcorn,
    },
    {
      title: "Popular",
      href: "/menu/movie/popular",
      icon: UserRound,
    },
    {
      title: "Top rated",
      href: "/menu/movie/top-rated",
      icon: BookmarkCheck,
    },
  ],
  shows: [
    {
      title: "On the air",
      href: "/menu/show/on-the-air",
      icon: MonitorPlay,
    },
    {
      title: "Popular",
      href: "/menu/show/popular",
      icon: UserRound,
    },
    {
      title: "Top rated",
      href: "/menu/show/top-rated",
      icon: BookmarkCheck,
    },
  ],
  discover: [
    {
      title: "Discover",
      href: "/menu",
      icon: Telescope,
    },
  ],
};

export const Sidebar: React.FC<SidebarProps> = ({ 
  children, 
  isOpen, 
  onClose,
  onOpen,
  isSmallScreen
}) => {
  const { theme } = useTheme();

  return (
    <>
      {isSmallScreen && (
        <button 
          onClick={onOpen} 
          className="fixed top-4 left-4 z-50 bg-gray-200 dark:bg-gray-700 p-2 rounded-md"
        >
          <MenuIcon />
        </button>
      )}
      <div 
        className={`h-full 
          ${isSmallScreen ? 'absolute top-20 left-0 w-64 z-50 transform transition-transform duration-300 ease-in-out' : 'relative block w-64'}
          ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}
          ${isSmallScreen && isOpen ? 'translate-x-0' : (isSmallScreen ? '-translate-x-full' : '')}
        `} 
        style={{ gridArea: "sidebar" }}
      >
        {isSmallScreen && onClose && (
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4"
          >
            <X />
          </button>
        )}
        {children}
      </div>
    </>
  );
};

export const AppSidebar: React.FC = () => {
  const { data: session } = useSession();
  const { mode, setMode } = useTheme();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1200);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getNextMode = () => {
    switch (mode) {
      case "auto": return "light";
      case "light": return "dark";
      case "dark": return "auto";
      default: return "auto";
    }
  };

  const getModeIcon = () => {
    switch (mode) {
      case "auto": return Monitor;
      case "light": return Sun;
      case "dark": return Moon;
      default: return Monitor;
    }
  };

  const getModeLabel = () => {
    switch (mode) {
      case "auto": return "Auto";
      case "light": return "Clair";
      case "dark": return "Sombre";
      default: return "Auto";
    }
  };

  const handleSignOut = () => {
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });
    signOut();
  };

  return (
    <Sidebar 
      isOpen={isSmallScreen && isSidebarOpen} 
      onClose={() => setIsSidebarOpen(false)}
      onOpen={() => setIsSidebarOpen(true)}
      isSmallScreen={isSmallScreen}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu> 
            {menuItems.discover.map((item) => (
              <SidebarMenuItem key={item.title} onClick={() => setIsSidebarOpen(false)}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarGroupLabel>Films</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.movies.map((item) => (
                <SidebarMenuItem key={item.title} onClick={() => setIsSidebarOpen(false)}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel>TV Shows</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.shows.map((item) => (
                <SidebarMenuItem key={item.title} onClick={() => setIsSidebarOpen(false)}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          {session && isSmallScreen && (
            <>
              <SidebarGroupLabel>Actions</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {isSidebarOpen && (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleSignOut}>
                          <LogOut />
                          <span>Déconnexion</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => setMode(getNextMode())}>
                          {React.createElement(getModeIcon())}
                          <span>Mode {getModeLabel()}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};