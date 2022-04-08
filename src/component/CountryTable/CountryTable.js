import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons';
import Link from 'next/link';
import { useState } from 'react';
import styles from './CountryTable.module.css';

const orderBy = (countries, value, direction) => {
  if (direction === 'desc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === 'asc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
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

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection('desc');
    } else if (direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };
  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection('name')}
        >
          <div>Name</div>
          {value === 'name' && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection('population')}
        >
          <div>population</div>
          {value === 'population' && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection('area')}
        >
          <div>
            Area (km <sup style={{ fontSize: '0.5rem' }}>2</sup>)
          </div>
          {value === 'area' && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection('gini')}
        >
          <div>Gini</div>
          {value === 'gini' && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountries.length > 0 ? (
        <>
          {orderedCountries.map((country, index) => {
            return (
              <Link
                href={`/country/${country.alpha3Code}`}
                key={country.alpha3Code}
              >
                <div className={styles.row}>
                  <div className={styles.flag}>
                    <img src={country.flag} alt={country.name} />
                  </div>
                  <div className={styles.country_name}>{country.name}</div>
                  <div className={styles.country_population}>
                    {country.population}
                  </div>
                  <div className={styles.country_area}>{country.area || 0}</div>
                  <div className={styles.country_gini}>{country.gini || 0}</div>
                </div>
              </Link>
            );
          })}
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>country not found</div>
      )}
    </div>
  );
};
