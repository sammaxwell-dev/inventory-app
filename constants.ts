import { Category, Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Guinness Draught', category: Category.IRISH_BEER, isActive: true },
  { id: '2', name: 'Kilkenny Cream Ale', category: Category.IRISH_BEER, isActive: true },
  { id: '3', name: 'Jameson Original', category: Category.IRISH_WHISKEY, isActive: true },
  { id: '4', name: 'Bushmills Black Bush', category: Category.IRISH_WHISKEY, isActive: true },
  { id: '5', name: 'Redbreast 12', category: Category.IRISH_WHISKEY, isActive: true },
  { id: '6', name: 'Heineken', category: Category.INTL_BEER, isActive: true },
  { id: '7', name: 'Corona Extra', category: Category.INTL_BEER, isActive: true },
  { id: '8', name: 'Baileys Irish Cream', category: Category.SPIRITS, isActive: true },
  { id: '9', name: 'Cabernet Sauvignon', category: Category.WINE, isActive: true },
  { id: '10', name: 'Pinot Grigio', category: Category.WINE, isActive: true },
];

export const CATEGORY_THEMES: Record<Category, { bg: string; text: string; icon: string }> = {
  [Category.IRISH_WHISKEY]: { bg: 'bg-amber-100', text: 'text-amber-700', icon: 'bg-amber-500' },
  [Category.IRISH_BEER]: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: 'bg-emerald-500' },
  [Category.INTL_BEER]: { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'bg-blue-500' },
  [Category.SPIRITS]: { bg: 'bg-purple-100', text: 'text-purple-700', icon: 'bg-purple-500' },
  [Category.WINE]: { bg: 'bg-rose-100', text: 'text-rose-700', icon: 'bg-rose-500' },
};