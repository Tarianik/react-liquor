import { WineItem } from '../pages/Home';
import { CartItem } from '../redux/Cart/slice';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.count, 0);
};
