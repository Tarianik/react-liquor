import React, { Dispatch, SetStateAction } from 'react';

import { useSelector } from 'react-redux';

import { Filter } from './Filter';
import { FilterSlider } from './FilterSlider';

import { RootState, useAppDispatch } from '../../redux/store';
import {
  setCountryCategory,
  setColorCategory,
  setSweetnessCategory,
  setVarietyCategory,
  setBrandCategory,
  setPriceRange,
  setVolumeCategory,
} from '../../redux/Filter/slice';

import styles from './Filters.module.scss';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

const colors = ['красное', 'белое', 'розовое'];
const countries = [
  'Франция',
  'Италия',
  'Испания',
  'Австралия',
  'Новая Зеландия',
  'Германия',
  'Австрия',
  'Венгрия',
  'Россия',
  'Чили',
  'Аргентина',
  'США',
  'Грузия',
  'ЮАР',
];
const varieties = [
  'мерло',
  'пино гриджио',
  'каберне совиньон',
  'шардоне',
  'темпранильо',
  'шираз',
  'пино нуар',
];
const sweetnesses = ['сладкое', 'полусладкое', 'полусухое', 'сухое'];
const brands = [
  'Mateus',
  'Attems',
  'Faustino',
  'Gran Castillo',
  'Calvet',
  'Golubitskoe Estate',
  'G.D.Vajra',
  'Outback Jack',
  'JP. Chenet',
  'Тавридия',
  'Torres',
  'Gerard Bertrand',
  'Masi',
];
const volumes = ['0.5', '0.75'];

export const Filters = ({
  filtersFull,
  setFiltersFull,
  initialFilter,
  obj,
}: {
  filtersFull: Boolean;
  setFiltersFull: Dispatch<SetStateAction<boolean>>;
  initialFilter: any;
  obj: any;
}) => {
  useWhyDidYouUpdate('Filters', {
    filtersFull,
    setFiltersFull,
    initialFilter,
    obj,
  });
  const [firstFilter, setFirstFilter] = React.useState([]);
  const [isFilter, setIsFilter] = React.useState(false);
  const filters = useSelector((state: RootState) => state.filter);
  React.useEffect(() => {
    for (const [key, value] of Object.entries(filters)) {
      if (
        (key === 'priceRange' && (value[0] !== 340 || value[1] !== 1990)) ||
        (key !== 'priceRange' && Array.isArray(value) && value.length !== 0)
      ) {
        setIsFilter(true);
        break;
      }

      setIsFilter(false);
    }
  }, [filters]);
  const dispatch = useAppDispatch();
  const resetFilters = () => {
    dispatch(setPriceRange([]));
    dispatch(setColorCategory([]));
    dispatch(setCountryCategory([]));
    dispatch(setSweetnessCategory([]));
    dispatch(setVarietyCategory([]));
    dispatch(setBrandCategory([]));
    dispatch(setPriceRange([340, 1990]));
    dispatch(setVolumeCategory([]));
  };
  return (
    <div className={`${styles.filters} ${filtersFull ? styles.active : ''}`}>
      <div className={styles.container}>
        {filtersFull && (
          <div
            onClick={() => setFiltersFull(false)}
            className={styles.closeIconBlock}
          >
            <svg
              // onClick={handleInputClear}
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
          </div>
        )}
        <FilterSlider name="Цена" />
        <Filter
          initialValue={initialFilter.colorCategory}
          value={obj.colorCategory}
          s="colorCategory"
          setFunction={setColorCategory}
          name="Цвет"
          firstFilter={firstFilter}
          setFirstFilter={setFirstFilter}
        />
        <Filter
          initialValue={initialFilter.countryCategory}
          value={obj.countryCategory}
          s="countryCategory"
          setFunction={setCountryCategory}
          name="Страна"
          firstFilter={firstFilter}
          setFirstFilter={setFirstFilter}
        />
        <Filter
          initialValue={initialFilter.sweetnessCategory}
          value={obj.sweetnessCategory}
          s="sweetnessCategory"
          setFunction={setSweetnessCategory}
          name="Содержание сахара"
          firstFilter={firstFilter}
          setFirstFilter={setFirstFilter}
        />
        <Filter
          initialValue={initialFilter.varietyCategory}
          value={obj.varietyCategory}
          s="varietyCategory"
          setFunction={setVarietyCategory}
          name="Сорт"
          firstFilter={firstFilter}
          setFirstFilter={setFirstFilter}
        />
        <Filter
          initialValue={initialFilter.brandCategory}
          value={obj.brandCategory}
          s="brandCategory"
          setFunction={setBrandCategory}
          name="Бренд"
          firstFilter={firstFilter}
          setFirstFilter={setFirstFilter}
        />
        <Filter
          initialValue={initialFilter.volumeCategory}
          value={obj.volumeCategory}
          s="volumeCategory"
          setFunction={setVolumeCategory}
          name="Объем"
          firstFilter={firstFilter}
          setFirstFilter={setFirstFilter}
        />
      </div>
      {isFilter && (
        <button className={styles.btnReset} onClick={resetFilters}>
          Сбросить фильтры
        </button>
      )}
    </div>
  );
};
// function dispatch(arg0: {
//   payload: number | number[];
//   type: 'filter/setPriceRange';
// }) {
//   throw new Error('Function not implemented.');
// }
