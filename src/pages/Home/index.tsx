import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Filters,
  ItemBlock,
  Pagination,
  Skeleton,
  Sort,
} from '../../components';
import { sortings } from '../../components/Sort';

import { type RootState, useAppDispatch } from '../../redux/store';
import { fetchWine } from '../../redux/Wine/asyncActions';
import { Status, setItems } from '../../redux/Wine/slice';
import { CartItem } from '../../redux/Cart/slice';
import {
  setCurrentPage,
  setFilters,
  setPriceRange,
} from '../../redux/Filter/slice';

import styles from './Home.module.scss';
import btnStyles from '../../scss/button.module.scss';
import loadingSvg from '../../assets/img/load-more.gif';
import useWindowScrollPosition from '../../utils/useWindowScrollPosition';
import { useLocalStorage } from '@uidotdev/usehooks';

export interface WineItem extends Record<string, any> {
  id: string;
  imageUrl: string;
  title: string;
  country: string;
  variety: string[];
  color: string;
  sweetness: string;
  abv: number;
  brand: string;
  volume: string;
  price: number;
  rating: number;
}

const pageSize = 9;
const numberOfPages = 4;

export const Home: React.FC = () => {
  const [filtersFull, setFiltersFull] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const wine = React.useRef([]);
  const isMounted = React.useRef(false);
  const chichi = React.useRef(false);

  const items = useSelector((state: RootState) => state.wine.items);
  const bbb = useSelector((state: RootState) => state.wine.status);
  const sortingValue = useSelector(
    (state: RootState) => state.filter.sorting.feature
  );
  const {
    searchValue,
    colorCategory,
    countryCategory,
    sweetnessCategory,
    varietyCategory,
    brandCategory,
    volumeCategory,
    priceRange,
    currentPage,
  } = useSelector((state: RootState) => state.filter);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  //useWindowScrollPosition('scroll', !isLoading);

  // React.useEffect(() => {
  //   if (!check.current && wine.length) {
  //     check.current = true;
  //     const prices = wine.map((el: any) => el.price);
  //     dispatch(setPriceRange([Math.min(...prices), Math.max(...prices)]));
  //   }
  // }, [items]);

  const getWine = async () => {
    const sorting = `${sortingValue.replace('-', '')}&`;
    const order = sortingValue.includes('-') ? 'DESC&' : 'ASC&';
    const search = searchValue !== '' ? `title_like=${searchValue}&` : '';
    const color =
      colorCategory.length !== 0
        ? `color_like=${colorCategory.join('|')}&`
        : '';
    const country =
      countryCategory.length !== 0
        ? `country_like=${countryCategory.join('|')}&`
        : '';
    const sweetness =
      sweetnessCategory.length !== 0
        ? `sweetness_like=^${sweetnessCategory.join('|')}&`
        : '';
    const variety =
      varietyCategory.length !== 0
        ? `variety_like=${varietyCategory.join('|')}&`
        : '';
    const brand =
      brandCategory.length !== 0
        ? `brand_like=${brandCategory.join('|')}&`
        : '';
    const volume =
      volumeCategory.length !== 0
        ? `volume_like=${volumeCategory.join('|')}&`
        : '';
    const price =
      priceRange.length !== 0
        ? `price_gte=${priceRange[0]}&price_lte=${priceRange[1]}&`
        : '';
    const page = `_page=${String(currentPage)}&`;
    const size = `_limit=${String(pageSize)}`;

    dispatch(
      fetchWine({
        sorting,
        order,
        search,
        color,
        country,
        sweetness,
        variety,
        brand,
        volume,
        price,
        page,
        size,
      })
    );
  };

  // #region ------------------------- Scroll ------------------------------------
  const fuck = React.useRef(0);
  const [aaa, setAaa] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      fuck.current = window.scrollY;
      //console.log('scrollY: ', fuck.current);
    };
    const handleStateChange = () => {
      // console.log(document.readyState);
      setStatus(true);
    };
    const handleAaa = () => {
      setAaa(true);
    };
    document.addEventListener('load', handleStateChange);
    document.addEventListener('readystatechange', handleAaa);
    //console.log('a?');

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('load', handleStateChange);
      document.removeEventListener('readystatechange', handleAaa);
      // console.log('return: ', fuck.current);
      sessionStorage.setItem('scroll', String(fuck.current));
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if (
      sessionStorage.getItem('scroll') &&
      sessionStorage.getItem('scroll') !== null
    ) {
      //@ts-ignore

      //console.log(window.scrollY, +sessionStorage.getItem('scroll'));
      //@ts-ignore
      const currScroll = +sessionStorage.getItem('scroll');
      if (currScroll !== 0) {
        //console.log(currScroll);
        //@ts-ignore
        //window.scrollTo(0, +sessionStorage.getItem('scroll'));
      }
    }
  }, []);

  // const y = React.useRef(0);

  // React.useEffect(() => {
  //   const foo = () => (y.current = window.scrollY);
  //   window.addEventListener('scroll', foo);

  //   return () => window.removeEventListener('scroll', foo);
  // }, []);

  const [scrollYStorage, setScrollYStorage] = useLocalStorage('scroll', 0);
  React.useEffect(() => {
    return () => {
      //console.log(window.scrollY);
      setScrollYStorage(window.scrollY);
    };
  }, []);
  React.useEffect(() => {
    window.scrollTo(0, scrollYStorage);
  }, []);

  // React.useEffect(() => {
  //   window.scrollTo(0, 50);
  //   return () => {
  //     localStorage.setItem('scroll', String(y.current));
  //   };
  // }, []);

  // React.useEffect(() => {
  //   const handleScrolla = () => {
  //     let documentHeight = document.body.scrollHeight;
  //     let currentScroll = window.scrollY + window.innerHeight;
  //     // When the user is [modifier]px from the bottom, fire the event.
  //     let modifier = 200;
  //     if (
  //       currentScroll + modifier > documentHeight &&
  //       Number(currentPage) <= 4
  //     ) {
  //       dispatch(setCurrentPage(String(Number(currentPage) + 1)));

  //       // getWine().then(() => {
  //       //   dispatch(
  //       //     setItems((prevItems: any) => {
  //       //       console.log('vot', [...prevItems, ...temp]);
  //       //       return [...prevItems, ...temp];
  //       //     })
  //       //   );
  //       // });
  //     }
  //   };
  //   window.addEventListener('scroll', handleScrolla);
  //   return () => window.removeEventListener('scroll', handleScrolla);
  // }, [getWine]);
  // #endregion

  // #region ---------------------- Parse params ---------------------------------
  React.useEffect(() => {
    console.log(window.location.search);
    if (window.location.search && !items.length) {
      console.log('suka');
      const params = qs.parse(window.location.search.substring(1));

      const paramsAdapted: Record<string, any> = {};
      for (const key of Object.keys(params)) {
        if (key === 'title_like') {
          paramsAdapted['searchValue'] = params[key];
        } else if (key.endsWith('_like')) {
          paramsAdapted[key.replace('_like', 'Category')] = params[key];
        } else if (key === '_sort') {
          paramsAdapted['sorting'] = params[key];
        } else if (key === '_order') {
          paramsAdapted['sorting'] =
            params[key] === 'DESC'
              ? `-${paramsAdapted['sorting']}`
              : paramsAdapted['sorting'];
        } else if (key === '_page') {
          paramsAdapted['currentPage'] = params[key];
        }
      }

      if (!paramsAdapted.sorting) {
        paramsAdapted.sorting = '-rating';
      }

      const sorting = sortings.find(
        (obj) => obj.feature === paramsAdapted.sorting
      );
      dispatch(setFilters({ ...paramsAdapted, sorting }));
    }
  }, []);
  //#endregion

  // MARK: --------------------- Filters fullscreen ------------------------------
  React.useEffect(() => {
    const handleResize = (e: Event) => {
      if (window.innerWidth > 1020) {
        setFiltersFull(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initialObj = React.useRef<any>({});

  // MARK: --------------- Add sort & order to initialObj ------------------------
  React.useEffect(() => {
    const sorting = `${sortingValue.replace('-', '')}`;
    const order = sortingValue.includes('-') ? 'DESC' : 'ASC';
    initialObj.current = {
      _sort: sorting,
      _order: order,
    };
  }, [sortingValue]);

  React.useEffect(() => {
    function filterEmptyStr(obj: object) {
      return Object.fromEntries(
        Object.entries(obj).filter(([k, v]) => v !== '')
      );
    }

    const sorting = `${sortingValue.replace('-', '')}`;
    const order = sortingValue.includes('-') ? 'DESC' : 'ASC';

    if (chichi.current) {
      const objQuery = {
        ...(sorting !== initialObj.current['_sort'] && {
          _sort: sorting,
          _order: order,
        }),
        ...(order !== initialObj.current['_order'] && {
          _sort: sorting,
          _order: order,
        }),
        ...(currentPage !== '1' && {
          _page: currentPage,
        }),
      };
      const query = qs.stringify(filterEmptyStr(objQuery));
      navigate(`?${query}`);
    }
  }, [searchValue]);

  React.useEffect(() => {
    function filterEmptyStr(obj: object) {
      return Object.fromEntries(
        Object.entries(obj).filter(([k, v]) => v !== '')
      );
    }
    const sorting = `${sortingValue.replace('-', '')}`;
    const order = sortingValue.includes('-') ? 'DESC' : 'ASC';

    if (chichi.current) {
      const objQuery = {
        // ...(sorting !== initialObj.current['_sort'] && {
        //   _sort: sorting,
        //   _order: order,
        // }),
        // ...(order !== initialObj.current['_order'] && {
        //   _sort: sorting,
        //   _order: order,
        // }),
        // ...(currentPage !== '1' && {
        //   _page: currentPage,
        // }),
        title_like: searchValue,
        color_like: colorCategory,
        country_like: countryCategory,
        sweetness_like: sweetnessCategory,
        variety_like: varietyCategory,
        brand_like: brandCategory,
        volume_like: volumeCategory,
        price_gte: priceRange[0],
        price_lte: priceRange[1],
      };
      //@ts-ignore
      console.log(
        'objq',
        sorting !== initialObj.current['_sort'],
        sorting,
        initialObj.current['_sort']
      );
      const query = qs.stringify(filterEmptyStr(objQuery));
      navigate(`?${query}`);
    }
    // const scroll = localStorage.getItem('scroll');
    // console.log(scroll);
    // if (scroll) window.scrollTo(0, +scroll);

    getWine()
      .then(() => {
        setIsLoading(true);
      })
      .catch(() => console.log('fuck'));

    return () => {
      dispatch(setItems([]));
    };
  }, [
    searchValue,
    sortingValue,
    colorCategory,
    countryCategory,
    sweetnessCategory,
    varietyCategory,
    brandCategory,
    volumeCategory,
    priceRange,
    currentPage,
  ]);

  React.useEffect(() => {
    console.log('isMount', isMounted);
    if (isMounted.current) {
      console.log('anus');
      dispatch(setCurrentPage('1'));
      wine.current = [];
    }
    isMounted.current = true;
  }, [
    searchValue,
    sortingValue,
    colorCategory,
    countryCategory,
    sweetnessCategory,
    varietyCategory,
    brandCategory,
    volumeCategory,
    priceRange,
  ]);

  const obj = React.useRef({
    colorCategory: [],
    countryCategory: [],
    sweetnessCategory: [],
    varietyCategory: [],
    brandCategory: [],
    volumeCategory: [],

    priceRange: [300, 1990],
  });
  console.log(obj);
  React.useEffect(() => {
    if (items.length) {
      //@ts-ignore
      for (let i in obj.current) {
        //@ts-ignore
        obj.current[i] = new Set(obj.current[i]);
      }
      items.forEach((el) => {
        for (let [key, value] of Object.entries(el)) {
          switch (key) {
            case 'color':
            case 'country':
            case 'sweetness':
            case 'brand':
            case 'volume':
              //@ts-ignore
              obj.current[`${key}Category`].add(value);
              break;
            case 'variety':
              value.forEach((el: string) => {
                //@ts-ignore
                obj.current[`${key}Category`].add(el);
              });
              break;
          }
        }
      });
      for (let i in obj.current) {
        //@ts-ignore
        obj.current[i] = Array.from(obj.current[i]).sort();
      }
    }
  }, [items]);

  const [initialFilter, setInitialFilter] = React.useState(obj.current);
  React.useEffect(() => {
    if (items.length === 0) console.log('((#(#(#(#(#(#())))))))');
  }, [items]);
  React.useEffect(() => {
    console.log('status', bbb, 'items:', items);

    if (bbb === Status.SUCCEEDED && !isMounted.current) {
      setInitialFilter(obj.current);

      isMounted.current = true;
    }
    if (bbb === Status.SUCCEEDED) {
      let a;
      a = items.map((el: WineItem, idx: number) => {
        const foundItem = cartItems.find((cart: CartItem) => cart.id === el.id);

        return (
          <ItemBlock
            key={el.id}
            {...el}
            count={foundItem ? foundItem.count : 0}
          />
        );
      });
      console.log('1', document.readyState);
      chichi.current = true;
      //@ts-ignore
      wine.current.push(...a);
      console.log('now', 'wine:', items, 'wine:', wine);
      setIsLoading(false);
    }
  }, [items]);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  // React.useEffect(() => {
  //   const a = wine.map((el: WineItem, idx: number) => {
  //     const foundItem = cartItems.find((cart: CartItem) => cart.id === el.id);

  //     return (
  //       <ItemBlock
  //         key={el.id}
  //         {...el}
  //         count={foundItem ? foundItem.count : 0}
  //       />
  //     );
  //   });

  // }, [currentPage, wine]);

  const skeletons = [...new Array(9)].map((_, idx) => <Skeleton key={idx} />);

  //console.log('ap', allWine, wine);
  console.log('2', document.readyState);
  return (
    <div className={styles.container}>
      <Filters
        filtersFull={filtersFull}
        setFiltersFull={setFiltersFull}
        initialFilter={initialFilter}
        obj={obj.current}
      />
      <div className={styles.contentMain}>
        <span className={styles.contentTitle}>
          {searchValue ? `По запросу "${searchValue}" найдено:` : 'Вино'}
        </span>
        <div className={styles.settings}>
          <Sort />
          <div
            onClick={() => setFiltersFull(true)}
            className={styles.filtersBtn}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <title>Filter</title>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g id="Filter">
                  <rect
                    id="Rectangle"
                    fillRule="nonzero"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  ></rect>
                  <line
                    x1="4"
                    y1="5"
                    x2="16"
                    y2="5"
                    id="Path"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></line>
                  <line
                    x1="4"
                    y1="12"
                    x2="10"
                    y2="12"
                    id="Path"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></line>
                  <line
                    x1="14"
                    y1="12"
                    x2="20"
                    y2="12"
                    id="Path"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></line>
                  <line
                    x1="8"
                    y1="19"
                    x2="20"
                    y2="19"
                    id="Path"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></line>
                  <circle
                    id="Oval"
                    strokeWidth="2"
                    strokeLinecap="round"
                    cx="18"
                    cy="5"
                    r="2"
                  ></circle>
                  <circle
                    id="Oval"
                    strokeWidth="2"
                    strokeLinecap="round"
                    cx="12"
                    cy="12"
                    r="2"
                  ></circle>
                  <circle
                    id="Oval"
                    strokeWidth="2"
                    strokeLinecap="round"
                    cx="6"
                    cy="19"
                    r="2"
                  ></circle>
                </g>
              </g>
            </svg>
            <span>Фильтры</span>
          </div>
        </div>

        <div className={styles.contentItems}>
          {bbb === Status.SUCCEEDED || wine.current ? wine.current : skeletons}
        </div>
        {+currentPage < numberOfPages && (
          <button
            onClick={() =>
              dispatch(setCurrentPage(String(Number(currentPage) + 1)))
            }
            className={`${btnStyles.btn} ${btnStyles.showMore}`}
          >
            {bbb === Status.SUCCEEDED ? (
              <span>Показать еще</span>
            ) : (
              <img src={loadingSvg} />
            )}
          </button>
        )}
        {/* <Pagination
          className={styles.pagination}
          currentPage={Number(currentPage)}
          totalCount={35}
          pageSize={pageSize}
          onPageChange={(currentPage) => dispatch(setCurrentPage(currentPage))}
        /> */}
      </div>
    </div>
  );
};
