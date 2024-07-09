import { WineItem } from '../pages/Home';

export const getWishlistLS = () => {
  const data = localStorage.getItem('wishlist');
  const items: WineItem[] = data ? JSON.parse(data) : [];

  return items;
};
