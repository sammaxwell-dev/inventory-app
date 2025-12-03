export enum Category {
  IRISH_WHISKEY = 'Irish Whiskey',
  IRISH_BEER = 'Irish Beer',
  INTL_BEER = 'International Beer',
  SPIRITS = 'Spirits',
  WINE = 'Wine',
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  isActive: boolean;
  description?: string;
}

export interface InventoryRecord {
  productId: string;
  fullBottles: number;
  partialBottle: number; // 0 to 1
  updatedAt: number;
}

export interface InventorySession {
  id: string;
  startDate: number;
  completedDate?: number;
  records: Record<string, InventoryRecord>; // Map productId to record
  status: 'active' | 'completed';
}

export type CategoryStats = {
  category: Category;
  totalProducts: number;
  countedProducts: number;
};