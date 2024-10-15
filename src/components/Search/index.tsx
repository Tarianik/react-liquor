import React from 'react';
import { useSelector } from 'react-redux';

import { type RootState, useAppDispatch } from '../../redux/store';
import { setSearchValue } from '../../redux/Filter/slice';
import { debounce } from '../../utils/debounce';

import styles from './Search.module.scss';

export const Search: React.FC = () => {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const searchValue = useSelector(
    (state: RootState) => state.filter.searchValue
  );
  const dispatch = useAppDispatch();

  const debounced = React.useMemo(
    () =>
      debounce((e) => {
        dispatch(setSearchValue(e));
      }, 200),
    [setSearchValue]
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounced(e.target.value);
  };

  const handleInputClear = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    setValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  return (
    <div className={styles.search}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.searchBar}
        type="text"
      />

      <svg
        className={styles.searchIcon}
        width="25"
        height="25"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
      </svg>

      {value && (
        <svg
          onClick={handleInputClear}
          className={styles.closeIcon}
          width="30"
          height="30"
          viewBox="0 0 1024 1024"
          fill="#000000"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M176.662 817.173c-8.19 8.471-7.96 21.977 0.51 30.165 8.472 8.19 21.978 7.96 30.166-0.51l618.667-640c8.189-8.472 7.96-21.978-0.511-30.166-8.471-8.19-21.977-7.96-30.166 0.51l-618.666 640z"
            fill=""
          />
          <path
            d="M795.328 846.827c8.19 8.471 21.695 8.7 30.166 0.511 8.471-8.188 8.7-21.694 0.511-30.165l-618.667-640c-8.188-8.471-21.694-8.7-30.165-0.511-8.471 8.188-8.7 21.694-0.511 30.165l618.666 640z"
            fill=""
          />
        </svg>
      )}
    </div>
  );
};
