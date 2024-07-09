import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState, useAppDispatch } from '../../redux/store';
import { clearCart } from '../../redux/Cart/slice';

import { CartEmpty, CartItem } from '../../components/';
import { WineItem } from '../Home';
import { CartItem as CartItemType } from '../../redux/Cart/slice';

import styles from './Cart.module.scss';
import btnStyles from '../../scss/button.module.scss';

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        {!items.length ? (
          <CartEmpty />
        ) : (
          <>
            <div className={styles.cartTop}>
              <div className={styles.name}>
                <svg
                  fill="#000000"
                  height="27px"
                  width="27px"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  enable-background="new 0 0 512 512"
                >
                  <g>
                    <g>
                      <path d="m464.5,301.1l36.5-178h-359.7l-12.5-59.2-108.4-52.9-9.4,18.7 99,47.8 50,238.8h289c0,0 28.5,17.9 17.5,40.5-4.9,7-12.5,15.6-26.1,15.6h-287.6v20.6h287.7c19.8,0 36.5-10.4 45.9-27 18.4-34.4-21.9-64.9-21.9-64.9zm-286.7-5.7l-32.3-151.6h330.5l-31.3,151.6h-266.9z" />
                      <path d="m212.2,422.1c-21.9,0-39.6,17.6-39.6,39.4s17.7,39.4 39.6,39.4 39.6-17.6 39.6-39.4-17.7-39.4-39.6-39.4zm0,58.1c-10.4,0-18.8-8.3-18.8-18.7s8.3-18.7 18.8-18.7 18.8,8.3 18.8,18.7-8.4,18.7-18.8,18.7z" />
                      <path d="m424.9,422.1c-21.9,0-39.6,17.6-39.6,39.4s17.7,39.5 39.6,39.5 40.7-17.6 39.6-39.4c0-21.8-17.7-39.5-39.6-39.5zm18.8,39.5c0,10.4-8.3,18.7-18.8,18.7s-18.8-8.3-18.8-18.7 8.3-18.7 18.8-18.7 19.8,8.3 18.8,18.7z" />
                    </g>
                  </g>
                </svg>
                <span>Корзина</span>
              </div>
              <div
                onClick={() => dispatch(clearCart())}
                className={styles.cartClear}
              >
                <svg
                  fill="#000000"
                  width="21"
                  height="21"
                  viewBox="8.5 8 33 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 18h2v16h-2z" />
                  <path d="M24 18h2v16h-2z" />
                  <path d="M28 18h2v16h-2z" />
                  <path d="M12 12h26v2H12z" />
                  <path d="M30 12h-2v-1c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v1h-2v-1c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3v1z" />
                  <path d="M31 40H19c-1.6 0-3-1.3-3.2-2.9l-1.8-24 2-.2 1.8 24c0 .6.6 1.1 1.2 1.1h12c.6 0 1.1-.5 1.2-1.1l1.8-24 2 .2-1.8 24C34 38.7 32.6 40 31 40z" />
                </svg>
                <span>Очистить корзину</span>
              </div>
            </div>
            <div className={styles.content}>
              {items.map((el: CartItemType, idx: number) => (
                <CartItem key={idx} {...el} />
              ))}
            </div>
            <div className={styles.cartBottom}>
              <div className={styles.orderInfo}>
                <span className={styles.total}>
                  Всего:{' '}
                  {items &&
                    items.reduce(
                      (sum: number, item: CartItemType) => sum + item.count,
                      0
                    )}{' '}
                  шт.
                </span>
                <span className={styles.total}>
                  Сумма заказа: <b>{totalPrice} руб.</b>
                </span>
              </div>
              <div className={styles.buttons}>
                <button
                  onClick={() => navigate('/')}
                  className={`${btnStyles.btn} ${btnStyles.backTo}`}
                >
                  Назад к каталогу
                </button>
                <button className={styles.payBtn}>Оформить</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
