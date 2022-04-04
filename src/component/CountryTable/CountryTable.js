import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons';
import { useState } from 'react';
import styles from './CountryTable.module.css';

const orderBy = (countries, direction) => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) =>
      a.population > b.population ? 1 : -1
    );
  }
  if (direction === 'desc') {
    return [...countries].sort((a, b) =>
      a.population > b.population ? -1 : 1
    );
  }
  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === 'desc') {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color='inherit' />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color='inherit' />
      </div>
    );
  }
};

export const CountryTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, 'desc');

  const switchDirection = () => {
    if (!direction) {
      setDirection('desc');
    } else if (direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection(null);
    }
  };

  return (
    <div>
      <div className={styles.heading}>
        <button className={styles.heading_name}>
          <div>name</div>
          <SortArrow direction='desc' />
        </button>
        <button className={styles.heading_population} onClick={switchDirection}>
          <div>population</div>
          <SortArrow direction={direction} />
        </button>
      </div>

      {orderedCountries.map((country, index) => {
        return (
          <div className={styles.row} key={country.name}>
            <div className={styles.country_name}>{country.name}</div>
            <div className={styles.country_population}>
              {country.population}
            </div>
          </div>
        );
      })}
    </div>
  );
};
