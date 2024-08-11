import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { WineItem } from '../../pages/Home';

import { RootState, useAppDispatch } from '../../redux/store';
import { plusItem, minusItem, CartItem } from '../../redux/Cart/slice';
import { addItem, removeItem } from '../../redux/Wishlist/slice';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

import styles from './ItemBlock.module.scss';
import btnStyles from '../../scss/button.module.scss';

// type WineItem = {
//   title: string;
//   rating: number;
//   country: string;
//   color: string;
//   sweetness: string;
//   volume: number;
//   imageUrl: string;
//   price: number;
// };

type ItemBlockProps = {
  id: string;
  title: string;
  rating: number;
  country: string;
  color: string;
  sweetness: string;
  volume: string;
  imageUrl: string;
  price: number;
  count: number;
};

export const ItemBlock = ({
  id,
  title,
  rating,
  country,
  color,
  sweetness,
  volume,
  imageUrl,
  price,
  count,
}: ItemBlockProps) => {
  useWhyDidYouUpdate('ItemBlock', {
    id,
    title,
    rating,
    country,
    color,
    sweetness,
    volume,
    imageUrl,
    price,
    count,
  });
  const items = useSelector((state: RootState) => state.wishlist.items);
  const itemIds = items.map((el: WineItem) => el.id);
  const dispatch = useAppDispatch();

  const handlePlusClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const item = {
      id,
      title,
      rating,
      country,
      color,
      sweetness,
      volume,
      imageUrl,
      price,
      count,
    } as CartItem;
    dispatch(plusItem(item));
  };

  const handleMinusClick = () => {
    dispatch(minusItem(id));
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const foundItem = items.find((el: WineItem) => el.id === id);

    if (!foundItem) {
      const item = {
        id,
        title,
        rating,
        country,
        color,
        sweetness,
        volume,
        imageUrl,
        price,
        count,
      } as any as WineItem;
      dispatch(addItem(item));
    } else {
      dispatch(removeItem(id));
    }
  };

  return (
    <Link to={`/wine/${id}`}>
      <div className={styles.itemBlock}>
        <div className={styles.container}>
          <div className={styles.itemBlockTop}>
            <div className={styles.titleFlex}>
              <div className={styles.title}>Вино {title}</div>
              <div className={styles.rating}>
                <svg
                  width="18px"
                  height="18px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 260 245"
                >
                  <path d="m56,237 74-228 74,228L10,96h240" />
                </svg>
                <span>{rating.toFixed(1)}</span>
              </div>
            </div>
            <div className={styles.tags}>
              {country}, {color}, {sweetness}, {volume} л
            </div>
          </div>
          <div className={styles.itemBlockBottom}>
            <img src={imageUrl} className={styles.liquorImg} />
            <svg
              onClick={handleHeartClick}
              className={`${styles.heartIcon} ${
                itemIds.includes(id) ? styles.active : ''
              }`}
              height="20px"
              width="20px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 18 16"
              xmlSpace="preserve"
            >
              <path d="M8.42499 2.34819L8.95719 2.98372L9.53647 2.39078C10.4804 1.42459 11.7192 0.75 13.0737 0.75C15.4335 0.75 17.25 2.48485 17.25 4.8C17.25 6.1929 16.6143 7.53655 15.3189 9.0719C14.0169 10.6151 12.1253 12.2637 9.74769 14.2714L9.73271 14.2841L9.7184 14.2975L9 14.9716L8.2816 14.2975L8.27026 14.2869L8.2585 14.2767C5.87598 12.2201 3.9839 10.5719 2.67945 9.0366C1.38339 7.5112 0.75 6.19054 0.75 4.8C0.75 2.48485 2.56648 0.75 4.92632 0.75C6.32775 0.75 7.53344 1.28354 8.42499 2.34819Z"></path>
            </svg>
            <span className={styles.price}>{price} ₽</span>
            {/* //@ts-ignore */}
            {count === 0 && (
              <button
                onClick={handlePlusClick}
                className={`${btnStyles.btn} ${btnStyles.itemBlockAdd} ${btnStyles.zero}`}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" />
                </svg>
                Добавить
              </button>
            )}
            {count !== 0 && (
              <div
                onClick={(e) => e.preventDefault()}
                className={`${btnStyles.btn} ${btnStyles.itemBlockAdd} ${btnStyles.nonZero}`}
              >
                <button
                  onClick={handleMinusClick}
                  className={`${btnStyles.btn} ${btnStyles.counter}`}
                >
                  {count === 1 ? (
                    <svg
                      width="16"
                      height="16"
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
                      width="16"
                      height="16"
                      viewBox="5.5 5.5 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" fill="white" />
                      <path
                        d="M6 12H18"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                <span>{count}</span>
                <button
                  onClick={handlePlusClick}
                  className={`${btnStyles.btn} ${btnStyles.counter}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="5.5 5.5 13 13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" fill="white" />
                    <path
                      d="M12 6V18"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 12H18"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
