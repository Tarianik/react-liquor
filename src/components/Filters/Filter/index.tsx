import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { type RootState, useAppDispatch } from '../../../redux/store';
import { Status } from '../../../redux/Wine/slice';

import styles from '../Filters.module.scss';

type FilterProps = {
  initialValue: any;
  value: string[];
  s: string;
  setFunction: ActionCreatorWithPayload<any, any>;
  name: string;
  firstFilter: any;
  setFirstFilter: Dispatch<SetStateAction<any>>;
};

export const Filter = ({
  initialValue,
  value,
  s,
  setFunction,
  name,
  firstFilter,
  setFirstFilter,
}: FilterProps) => {
  const [open, setOpen] = React.useState(false);
  const prev = React.useRef<any>(value);
  const status = useSelector((state: RootState) => state.wine.status);
  const selector = useSelector((state: RootState) => state.filter);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (status === Status.SUCCEEDED) {
      initialValue.map((el: any) => {
        //@ts-ignore
        if (selector[s].includes(el)) {
          if (!firstFilter.includes(s) /* s !== firstFilter */) {
            const a = new Set(firstFilter);
            a.add(s);
            const c = Array.from(a);

            setFirstFilter(Array.from(a));
          }
        }
      });
      if (value.length) {
        prev.current = value;
      }
      //@ts-ignore
      if (!selector[s].length) {
        setFirstFilter(firstFilter.filter((el: any) => s !== el));
      }
    }
  }, [selector, status]);

  const addCategory = React.useCallback(
    (el: string | number, e: React.MouseEvent<HTMLLabelElement>) => {
      e.preventDefault();
      dispatch(setFunction(el));
    },
    []
  );

  return (
    <div className={styles.filter}>
      <div
        onClick={() => setOpen(!open)}
        className={`${styles.name} ${open ? styles.active : ''}`}
      >
        <div className={styles.title}>{name}</div>
        <i className={styles.toggleIcon} />
      </div>
      {open && (
        <div className={styles.filterPopup}>
          <ul>
            {initialValue.map((el: string, idx: number) => (
              <li key={idx}>
                <label
                  onClick={(e) => addCategory(el, e)}
                  className={`${
                    //@ts-ignore
                    Array.isArray(selector[s]) && selector[s].includes(el)
                      ? styles.active
                      : ''
                  }`}
                >
                  <input type="checkbox" />
                  {el}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ${
//   value.includes(el) ||
//   (firstFilter.at(-1) === s && prev.current.includes(el))
//     ? ''
//     : styles.absent
// }
