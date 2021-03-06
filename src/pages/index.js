import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../component/Layout/Layout';
import { SearchInput } from '../component/SearchInput/SearchInput';
import { CountryTable } from '../component/CountryTable/CountryTable';

const HomePage = ({ countries }) => {
  const [keyword, setKeyword] = useState('');

  const filteredCountry = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword.toLowerCase()) ||
      country.region.toLowerCase().includes(keyword.toLowerCase()) ||
      country.subregion.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <Layout>
      <div className={styles.input_container}>
        <div className={styles.counts}>
          {' '}
          Found <span>{countries.length}</span> countries
        </div>

        <div className={styles.input}>
          <SearchInput
            placeholder='Filter by Name, region or SubRegion'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
      <CountryTable countries={filteredCountry} />
    </Layout>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.com/v2/all');
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
