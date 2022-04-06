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
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  return (
    <Layout>
      <div className={styles.counts}>
        {' '}
        Found <span>{countries.length}</span> countries
      </div>
      <SearchInput
        placeholder='Filter by Name, region or SubRegion'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
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
