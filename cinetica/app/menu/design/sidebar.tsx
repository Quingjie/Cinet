import { PropsWithChildren, useEffect, useState } from "react";
import { BookmarkCheck, MonitorPlay, Popcorn, Telescope, UserRound } from "lucide-react";
import { useTheme } from '../theme-provider';

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

export const Sidebar = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <div 
      className={`h-full ${
        theme === 'dark' 
          ? 'bg-gray-900 text-white' 
          : 'bg-white text-black'
      }`} 
      style={{ gridArea: "sidebar" }}
    >
      {children}
    </div>
  );
};


const item = [
  {
    title: "Discover",
    url: "#",
    icon: Telescope,
  },
];
const itemsMovie = [
  {
    title: "Now playing",
    url: "#",
    icon: Popcorn,
  },
  {
    title: "Popular",
    url: "#",
    icon: UserRound,
  },
  {
    title: "Top rated",
    url: "#",
    icon: BookmarkCheck,
  },
];
const itemsShow = [
  {
    title: "On the air",
    url: "#",
    icon: MonitorPlay,
  },
  {
    title: "Popular",
    url: "#",
    icon: UserRound,
  },
  {
    title: "Top rated",
    url: "#",
    icon: BookmarkCheck,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* Bouton Discover redirige vers la page principale */}
          <SidebarMenu>
            {item.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href="/menu"> {/* Route principale */}
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          {/* Boutons Movies */}
          <SidebarGroupLabel>Movies</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsMovie.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={`/menu/movie/${item.title.toLowerCase().replace(" ", "-")}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          {/* Boutons TV Shows */}
          <SidebarGroupLabel>TV Shows</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsShow.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={`/menu/show/${item.title.toLowerCase().replace(" ", "-")}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}