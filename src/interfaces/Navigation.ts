export interface Navigation {
  order: number;
  id: number;
  title: string;
  type: string;
  path: string;
  externalPath: null;
  uiRouterKey: string;
  menuAttached: boolean;
  collapsed: boolean;
  createdAt: Date;
  updatedAt: Date;
  audience: any[];
  parent: null;
  related: null;
  items: null;
}
