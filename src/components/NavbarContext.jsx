import { createContext } from 'react';

// Create a context for sharing navbar state between components
export const NavbarContext = createContext({
  navbarDrawerOpen: false,
  setNavbarDrawerOpen: () => {},
  activeTab: 'navbar',
  setActiveTab: () => {}
});