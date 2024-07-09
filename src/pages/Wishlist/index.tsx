import React from 'react';

import { useSelector } from 'react-redux';

import { Sort, Filters, ItemBlock, WishlistEmpty } from '../../components';
import { WineItem } from '../../pages/Home';

import { RootState } from '../../redux/store';

import styles from '../Home/Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../redux/Cart/slice';

export const Wishlist: React.FC = () => {
  const {
    searchValue,
    colorCategory,
    countryCategory,
    sweetnessCategory,
    varietyCategory,
    brandCategory,
    volumeCategory,
    priceRange,
  } = useSelector((state: RootState) => state.filter);
  const [filtersFull, setFiltersFull] = React.useState(false);
  const navigate = useNavigate();
  const wine: WineItem[] = useSelector(
    (state: RootState) => state.wishlist.items
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (!wine.length) {
    return <WishlistEmpty />;
  }

  const items = wine.map((el: WineItem, idx: number) => {
    const foundItem = cartItems.find((cart: CartItem) => cart.id === el.id);

    return (
      <ItemBlock key={el.id} {...el} count={foundItem ? foundItem.count : 0} />
    );
  });

  return (
    <>
      <span onClick={() => navigate('/')} className={styles.backToLink}>
        ← &nbsp;Назад к каталогу
      </span>
      <div className={styles.container}>
        <div className={styles.contentMain}>
          <span className={styles.contentTitle}>Любимые вина</span>

          <div className={styles.contentItems}>{items}</div>
        </div>
      </div>
    </>
  );
};
