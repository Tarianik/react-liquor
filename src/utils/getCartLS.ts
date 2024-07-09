import { WineItem } from '../pages/Home';
import { CartItem } from '../redux/Cart/slice';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartLS = () => {
  const data = localStorage.getItem('cart');
  const items: CartItem[] = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
