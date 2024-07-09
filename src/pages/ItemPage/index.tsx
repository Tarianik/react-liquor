import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import { WineItem } from '../Home';

import styles from './ItemPage.module.scss';
import btnStyles from '../../scss/button.module.scss';
import { RootState, useAppDispatch } from '../../redux/store';
import { addItem, removeItem } from '../../redux/Wishlist/slice';
import { useSelector } from 'react-redux';
import { CartItem, minusItem, plusItem } from '../../redux/Cart/slice';
import { NotFound } from '../NotFound';

export const ItemPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useSelector((state: RootState) => state.wishlist.items);
  const itemIds = items.map((el: WineItem) => el.id);
  const [data, setData] = React.useState<WineItem>();
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const ourItem = cartItems.find((el: CartItem) => el.id === id);

  React.useEffect(() => {
    async function getWineData() {
      try {
        const { data } = await axios.get('http://localhost:3003/items/' + id);
        setData(data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }

    getWineData();
  }, []);

  const handlePlusClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const item = {
      ...data,
    } as CartItem;
    dispatch(plusItem(item));
  };

  const handleMinusClick = () => {
    dispatch(minusItem(data!.id));
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const foundItem = items.find((el: WineItem) => el.id === id);
    if (!foundItem) {
      const item = {
        ...data,
      } as WineItem;
      dispatch(addItem(item));
    } else {
      dispatch(removeItem(foundItem.id));
    }
  };

  if (error) {
    return <NotFound />;
  }

  return data ? (
    <div className={styles.itemPage}>
      <span onClick={() => navigate('/')} className={styles.backToLink}>
        ← &nbsp;Назад к каталогу
      </span>
      <div className={styles.title}>Вино {data.title}</div>
      <div className={styles.flex}>
        <img src={data.imageUrl} alt="" />
        <div className={styles.details}>
          <div className={styles.rating}>
            <span>Рейтинг:</span>
            <div className={styles.ratingBlock}>
              <svg
                width="20px"
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 260 245"
              >
                <path d="m56,237 74-228 74,228L10,96h240" />
              </svg>
              <span>{data.rating}</span>
            </div>
            <svg
              onClick={handleHeartClick}
              className={`${styles.heartIcon} ${
                id && itemIds.includes(id) ? styles.active : ''
              }`}
              height="28px"
              width="28px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 18 16"
              xmlSpace="preserve"
            >
              <path d="M8.42499 2.34819L8.95719 2.98372L9.53647 2.39078C10.4804 1.42459 11.7192 0.75 13.0737 0.75C15.4335 0.75 17.25 2.48485 17.25 4.8C17.25 6.1929 16.6143 7.53655 15.3189 9.0719C14.0169 10.6151 12.1253 12.2637 9.74769 14.2714L9.73271 14.2841L9.7184 14.2975L9 14.9716L8.2816 14.2975L8.27026 14.2869L8.2585 14.2767C5.87598 12.2201 3.9839 10.5719 2.67945 9.0366C1.38339 7.5112 0.75 6.19054 0.75 4.8C0.75 2.48485 2.56648 0.75 4.92632 0.75C6.32775 0.75 7.53344 1.28354 8.42499 2.34819Z"></path>
            </svg>
          </div>
          <div className={styles.rows}>
            <div className={styles.category}>
              <span>Страна:</span>
            </div>
            <div className={styles.value}>{data.country}</div>
          </div>
          <div className={styles.rows}>
            <div className={styles.category}>Цвет:</div>
            <div className={styles.value}>{data.color}</div>
          </div>
          <div className={styles.rows}>
            <div className={styles.category}>Содержание сахара:</div>
            <div className={styles.value}>{data.sweetness}</div>
          </div>
          <div className={styles.rows}>
            <div className={styles.category}>Сорт:</div>
            <div className={styles.value}>{data.variety.join(', ')}</div>
          </div>
          <div className={styles.rows}>
            <div className={styles.category}>Бренд:</div>
            <div className={styles.value}>{data.brand}</div>
          </div>
          <div className={styles.rows}>
            <div className={styles.category}>Объем:</div>
            <div className={styles.value}>{data.volume} л</div>
          </div>
          <div className={styles.rows}>
            <div className={styles.category}>Крепость:</div>
            <div className={styles.value}>{data.abv} %</div>
          </div>
        </div>
        <div className={styles.buy}>
          <div className={styles.price}>1 500 ₽</div>

          {(!ourItem || ourItem.count === 0) && (
            <button
              onClick={handlePlusClick}
              className={`${btnStyles.btn} ${btnStyles.itemPageAdd}`}
            >
              В корзину
            </button>
          )}
          {ourItem && ourItem.count !== 0 && (
            <div
              onClick={(e) => e.preventDefault()}
              className={`${btnStyles.btn} ${btnStyles.itemBlockAdd} ${btnStyles.nonZeroPage} ${btnStyles.nonZero}`}
            >
              <button
                onClick={handleMinusClick}
                className={`${btnStyles.btn} ${btnStyles.counter}`}
              >
                {ourItem.count === 1 ? (
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

              <span>{ourItem.count}</span>
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
          <div className={styles.methods}>
            <span>Способы получения заказа:</span>
            <ul>
              <li>
                <h3>⚡</h3>{' '}
                <span>
                  <b>Забрать сегодня</b>
                </span>
              </li>
              <li>
                <h3>🔥</h3>
                <span>
                  <b>Забрать через 3 дня</b> с дополнительной <i>скидкой 5%</i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.notLoaded}></div>
  );
};
