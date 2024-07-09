import React, { SyntheticEvent } from 'react';
import Slider from '@mui/material/Slider';

import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../../redux/store';
import { setPriceRange } from '../../../redux/Filter/slice';

import styles from '../Filters.module.scss';

export const FilterSlider = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();
  const priceRange = useSelector((state: RootState) => state.filter.priceRange);

  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState<number[]>([
    priceRange[0],
    priceRange[1],
  ]);

  React.useEffect(() => {
    setValue([priceRange[0], priceRange[1]]);
    setFrom(priceRange[0]);
    setTo(priceRange[1]);
  }, [priceRange]);

  const [from, setFrom] = React.useState(priceRange[0]);
  const [to, setTo] = React.useState(priceRange[1]);

  const fromRef = React.useRef(null);
  const toRef = React.useRef(null);

  const priceRangeRef = React.useRef([...priceRange]);

  const sliderRef = React.useRef(null);

  const handleChange = (e: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);

    if (Array.isArray(newValue)) {
      setFrom(newValue[0] as number);
      setTo(newValue[1]);
    }
  };

  const handleChangeCommitted = (
    e: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    dispatch(setPriceRange(newValue as number[]));
  };

  const handleChangePrice = (
    e: React.FocusEvent<HTMLInputElement>,
    input: 'from' | 'to'
  ) => {
    if (input === 'to') {
      if (+e.target.value <= priceRangeRef.current[1]) {
        if (+e.target.value < priceRangeRef.current[0]) {
          setValue([priceRangeRef.current[0], priceRangeRef.current[0]]);
          dispatch(
            setPriceRange([priceRangeRef.current[0], priceRangeRef.current[0]])
          );
          setFrom(priceRangeRef.current[0]);
          setTo(priceRangeRef.current[0]);
        } else if (+e.target.value < value[0]) {
          setValue([priceRangeRef.current[0], +e.target.value]);
          dispatch(setPriceRange([priceRangeRef.current[0], +e.target.value]));
          setFrom(priceRangeRef.current[0]);
          setTo(+e.target.value);
        } else {
          setValue([value[0], +e.target.value]);
          dispatch(setPriceRange([value[0], +e.target.value]));
          setTo(+e.target.value);
        }
      } else {
        setValue([value[0], priceRangeRef.current[1]]);
        dispatch(setPriceRange([value[0], priceRangeRef.current[1]]));
        setTo(priceRangeRef.current[1]);
      }
    } else {
      if (+e.target.value >= priceRangeRef.current[0]) {
        if (+e.target.value > priceRangeRef.current[1]) {
          setValue([priceRangeRef.current[1], priceRangeRef.current[1]]);
          dispatch(
            setPriceRange([priceRangeRef.current[1], priceRangeRef.current[1]])
          );
          setFrom(priceRangeRef.current[1]);
          setTo(priceRangeRef.current[1]);
        } else if (+e.target.value > value[1]) {
          setValue([+e.target.value, priceRangeRef.current[1]]);
          dispatch(setPriceRange([+e.target.value, priceRangeRef.current[1]]));
          setFrom(+e.target.value);
          setTo(priceRangeRef.current[1]);
        } else {
          setValue([+e.target.value, value[1]]);
          dispatch(setPriceRange([+e.target.value, value[1]]));
          setFrom(+e.target.value);
        }
      } else {
        setValue([priceRangeRef.current[0], value[1]]);
        dispatch(setPriceRange([priceRangeRef.current[0], value[1]]));
        setFrom(priceRangeRef.current[0]);
      }
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

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
          <Slider
            className={styles.slider}
            // sx={{
            //   width: 100%,
            // }}
            ref={sliderRef}
            getAriaLabel={() => 'Temperature range'}
            min={priceRangeRef.current[0]}
            max={priceRangeRef.current[1]}
            //defaultValue={[5, 1000]}
            value={value}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommitted}
            valueLabelDisplay="auto"
            size="small"
            //getAriaValueText={valuetext}
          />
          <div className={styles.inputs}>
            <div className={styles.inputPrice}>
              <span>От:</span>
              <input
                ref={fromRef}
                value={from}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFrom(+e.target.value);
                }}
                onBlur={(e) => {
                  handleChangePrice(e, 'from');
                }}
                onKeyUp={handleEnter}
                type="number"
                min="0"
                max="99999"
              />
            </div>
            <div className={styles.inputPrice}>
              <span>До:</span>
              <input
                ref={toRef}
                value={to}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTo(+e.target.value)
                }
                onBlur={(e) => {
                  handleChangePrice(e, 'to');
                }}
                onKeyUp={handleEnter}
                type="number"
                min="0"
                max="99999"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
