import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Search } from '../Search';
import { SignInModal } from '../SignInModal';

import { RootState } from '../../redux/store';

import styles from './Header.module.scss';
import { CartItem } from '../../redux/Cart/slice';
import { WineItem } from '../../pages/Home';

export const Header: React.FC = () => {
  //const formRef = React.useRef<HTMLDivElement>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [modal, setModal] = React.useState(false);
  const isMounted = React.useRef(false);

  const [countCart, setCountCart] = React.useState(0);
  const [countWishlist, setCountWishlist] = React.useState(0);

  React.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
    isMounted.current = true;
  }, [cartItems, wishlistItems]);

  React.useEffect(() => {
    setCountCart(
      cartItems
        ? cartItems.reduce((sum: number, el: CartItem) => sum + 1, 0)
        : 0
    );
  }, [cartItems]);

  React.useEffect(() => {
    setCountWishlist(
      wishlistItems
        ? wishlistItems.reduce((sum: number, el: WineItem) => sum + 1, 0)
        : 0
    );
  }, [wishlistItems]);

  // React.useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (formRef.current && !e.composedPath().includes(formRef.current)) {
  //       setModal(false);
  //     }
  //   };
  //   document.body.addEventListener('click', handleClickOutside);

  //   return () => document.body.removeEventListener('click', handleClickOutside);
  // }, []);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.addressTop}>
          <div className={styles.city}>г. Владивосток, </div>
          <div className={styles.street}>ул. Гоголя, 3</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.flexItem}>
            <Link to="/">
              <div className={`${styles.logo}`}>
                <b>V</b>eenou
              </div>
            </Link>
          </div>

          <div className={`${styles.address} ${styles.flexItem}`}>
            <div className={styles.city}>г. Владивосток, </div>
            <div className={styles.street}>ул. Гоголя, 3</div>
          </div>
          <div className={`${styles.flexItem} ${styles.search}`}>
            <Search />
          </div>

          <div className={`${styles.links} ${styles.flexItem}`}>
            <div onClick={() => setModal(!modal)}>
              <div className={styles.link}>
                <svg
                  className={styles.login}
                  height="30"
                  width="30"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="4 0 502.1 500.1"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <g>
                        <path
                          d="M0,249.6c0,9.5,7.7,17.2,17.2,17.2h327.6l-63.9,63.8c-6.7,6.7-6.7,17.6,0,24.3c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5
				l93.1-93.1c6.7-6.7,6.7-17.6,0-24.3l-93.1-93.1c-6.7-6.7-17.6-6.7-24.3,0c-6.7,6.7-6.7,17.6,0,24.3l63.8,63.8H17.2
				C7.7,232.5,0,240.1,0,249.6z"
                        />
                        <path
                          d="M396.4,494.2c56.7,0,102.7-46.1,102.7-102.8V107.7C499.1,51,453,4.9,396.4,4.9H112.7C56,4.9,10,51,10,107.7V166
				c0,9.5,7.7,17.1,17.1,17.1c9.5,0,17.2-7.7,17.2-17.1v-58.3c0-37.7,30.7-68.5,68.4-68.5h283.7c37.7,0,68.4,30.7,68.4,68.5v283.7
				c0,37.7-30.7,68.5-68.4,68.5H112.7c-37.7,0-68.4-30.7-68.4-68.5v-57.6c0-9.5-7.7-17.2-17.2-17.2S10,324.3,10,333.8v57.6
				c0,56.7,46.1,102.8,102.7,102.8H396.4L396.4,494.2z"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                <span>Войти</span>
              </div>
            </div>
            <Link to="/wishlist">
              <div className={styles.link}>
                <div className={styles.image}>
                  <svg
                    className={styles.wishlist}
                    height="30"
                    width="30"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 18 16"
                    xmlSpace="preserve"
                  >
                    <path d="M8.42499 2.34819L8.95719 2.98372L9.53647 2.39078C10.4804 1.42459 11.7192 0.75 13.0737 0.75C15.4335 0.75 17.25 2.48485 17.25 4.8C17.25 6.1929 16.6143 7.53655 15.3189 9.0719C14.0169 10.6151 12.1253 12.2637 9.74769 14.2714L9.73271 14.2841L9.7184 14.2975L9 14.9716L8.2816 14.2975L8.27026 14.2869L8.2585 14.2767C5.87598 12.2201 3.9839 10.5719 2.67945 9.0366C1.38339 7.5112 0.75 6.19054 0.75 4.8C0.75 2.48485 2.56648 0.75 4.92632 0.75C6.32775 0.75 7.53344 1.28354 8.42499 2.34819Z"></path>
                  </svg>
                  {countWishlist !== 0 && (
                    <div className={styles.count}>{countWishlist}</div>
                  )}
                </div>

                <span>Избранное</span>
              </div>
            </Link>
            <Link to="/cart">
              <div className={styles.link}>
                <div className={styles.image}>
                  <svg
                    className={styles.cart}
                    width="30"
                    height="30"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h48v48H0z" fill="none" />
                    <g id="Shopicon">
                      <path
                        d="M8,44h32c2.2,0,4-1.8,4-4l0-26h-8.18C34.863,8.334,29.934,4,24,4S13.137,8.334,12.181,14H4l0,26C4,42.2,5.8,44,8,44z M24,8
		c3.719,0,6.845,2.555,7.737,6H16.263C17.155,10.555,20.281,8,24,8z M12,18v4h4v-4h16v4h4v-4h4l0,22L8,40l0-22H12z"
                      />
                    </g>
                  </svg>
                  {countCart !== 0 && (
                    <div className={styles.count}>{countCart}</div>
                  )}
                </div>
                <span>Корзина</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {modal && <SignInModal open={modal} onClose={() => setModal(false)} />}
    </div>
  );
};
