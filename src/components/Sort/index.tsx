import React from 'react';

import { RootState, useAppDispatch } from '../../redux/store';
import { setSorting, SortItem } from '../../redux/Filter/slice';

import styles from './Sort.module.scss';
import { useSelector } from 'react-redux';

export const sortings = [
  { feature: 'rating', name: '▲ рейтингу' },
  { feature: '-rating', name: '▼ рейтингу' },
  { feature: 'price', name: '▲ цене' },
  { feature: '-price', name: '▼ цене' },
  { feature: 'title', name: '▲ алфавиту' },
  { feature: '-title', name: '▼ алфавиту' },
];

export const Sort: React.FC = () => {
  const sorting = useSelector((state: RootState) => state.filter.sorting.name);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (popupRef.current && !e.composedPath().includes(popupRef.current)) {
        setOpen(false);
      }
    });
  }, []);

  const onClickSort = (sort: SortItem) => {
    dispatch(setSorting(sort));
    setOpen(false);
  };

  return (
    <div
      ref={popupRef}
      className={`${styles.sort} ${open ? styles.active : ''}`}
    >
      <div onClick={() => setOpen(!open)} className={styles.name}>
        <i className={styles.toggleIcon} />
        <b>Сортировать по:</b>
        <span>{sorting}</span>
      </div>
      {open && (
        <div className={styles.sortPopup}>
          <ul>
            {sortings.map((sort, idx) => (
              <li onClick={() => onClickSort(sort)} key={idx}>
                {sort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
