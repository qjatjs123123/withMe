import { MenuItem } from './_types/MenuItem';

declare global {
  interface Liveblocks {
    Storage: {
      initialMenuItems: MenuItem[];
      menuItems: MenuItem[];
    };
    UserMeta: {
      id: string;
      info: {
        name: string;
        avatar_url?: string;
      };
    };
  }
}

export {};
