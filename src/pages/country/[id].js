import React from 'react';
import Layout from '../../component/Layout/Layout';
import styles from './country.module.css';

const Country = ({ country }) => {
  return (
    <Layout title={country.name}>
      <div>
        <div className={styles.overview_panel}>
          <img src={country.flag} alt={country.name} />
          <h1>{country.name}</h1>
          <div>{country.region}</div>

          <div>
            <div className={styles.overview_population}>
              <div>{country.population}</div>
              <div>Population</div>
            </div>
            <div className={styles.overview_area}></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`https://restcountries.com/v2/alpha/${params.id}`);
  const country = await res.json();

  console.log(params.id);
  return {
    props: {
      country,
    },
  };
};
