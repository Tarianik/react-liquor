import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Sort, Filters, ItemBlock, WishlistEmpty } from '../../components';
import { WineItem } from '../../pages/Home';

import { type RootState } from '../../redux/store';
import { CartItem } from '../../redux/Cart/slice';

import styles from '../Home/Home.module.scss';

export const Wishlist: React.FC = () => {
  const wine: WineItem[] = useSelector(
    (state: RootState) => state.wishlist.items
  );

  if (!wine.length) {
    return <WishlistEmpty />;
  }

  const [filtersFull, setFiltersFull] = React.useState(false);
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
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const navigate = useNavigate();

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
