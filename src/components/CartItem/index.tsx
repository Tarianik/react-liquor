import React from 'react';

import { WineItem } from '../../pages/Home';
import { CartItem as CartItemType } from '../../redux/Cart/slice';

import { useAppDispatch } from '../../redux/store';
import { plusItem, minusItem, removeItems } from '../../redux/Cart/slice';

import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';

export const CartItem: React.FC<CartItemType> = ({
  id,
  title,
  country,
  color,
  sweetness,
  volume,
  imageUrl,
  price,
  count,
}) => {
  const dispatch = useAppDispatch();
  const handlePlusClick = () => {
    const item = {
      id,
      title,
      country,
      color,
      sweetness,
      volume,
      imageUrl,
      price,
      count,
    } as CartItemType;
    dispatch(plusItem(item));
  };

  const handleMinusClick = () => {
    dispatch(minusItem(id));
  };

  const handleRemoveClick = () => {
    dispatch(removeItems(id));
  };

  return (
    <div className={styles.cartItem}>
      <Link to={`/wine/${id}`}>
        <img src={imageUrl} alt="" />
        <div className={styles.name}>
          <div className={styles.title}>Вино {title}</div>
          <span className={styles.details}>
            {country}, {color}, {sweetness}, {volume} л.
          </span>
        </div>
      </Link>

      <div className={styles.counter}>
        <div className={styles.buttons}>
          <div onClick={handleMinusClick} className={styles.btnPlus}>
            {count === 1 ? (
              <svg
                fill="#000000"
                width="27"
                height="27"
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
            ) : (
              <svg
                width="27px"
                height="27px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H7Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                />
              </svg>
            )}
          </div>
          <span>{count}</span>
          <div onClick={handlePlusClick} className={styles.btnMinus}>
            <svg
              width="27px"
              height="27px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
              />
            </svg>
          </div>
        </div>

        <div className={styles.counterInfo}>{price} руб. / шт.</div>
      </div>
      <div className={styles.price}>{price * count} руб.</div>
      <div onClick={handleRemoveClick} className={styles.btnDelete}>
        <svg
          width="27px"
          height="27px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.75716 7.75736C8.14768 7.36683 8.78084 7.36683 9.17137 7.75736L11.9998 10.5858L14.8283 7.75736C15.2188 7.36684 15.852 7.36684 16.2425 7.75736C16.6331 8.14789 16.6331 8.78105 16.2425 9.17158L13.4141 12L16.2424 14.8284C16.633 15.2189 16.633 15.8521 16.2424 16.2426C15.8519 16.6332 15.2187 16.6332 14.8282 16.2426L11.9998 13.4143L9.17146 16.2426C8.78094 16.6332 8.14777 16.6332 7.75725 16.2426C7.36672 15.8521 7.36672 15.219 7.75725 14.8284L10.5856 12L7.75716 9.17157C7.36663 8.78104 7.36663 8.14788 7.75716 7.75736Z"
            fill="#000000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
            fill="#000000"
          />
        </svg>
      </div>
    </div>
  );
};
