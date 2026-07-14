export interface BaseMenuItem {
  label: string;
  href: string;
}

type BasePanelButton = {
  title: string;
  iconName: 'Home' | 'Catalog' | 'Cart' | 'Search' | 'More';
};

export type PanelButtonAsLink = BasePanelButton & {
  href: string;
  triggerId?: never;
};

export type PanelButtonAsButton = BasePanelButton & {
  triggerId: string;
  href?: never;
};

export type PanelButton = PanelButtonAsLink | PanelButtonAsButton;
