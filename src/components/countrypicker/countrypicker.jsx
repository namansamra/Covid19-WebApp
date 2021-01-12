import React, { useEffect, useState } from 'react';
import { fetchCountries } from '../../api';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './countrypicker.module.css';
function Countrypicker({ handleCountrychange }) {
  const [countries, Setcontries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      Setcontries(await fetchCountries());
    };
    fetchAPI();
  }, [Setcontries]);

  console.log(countries);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect 
        defaultValue=""
        onChange={(e) => handleCountrychange(e.target.value)}>
        <option  value="">
          Global
        </option>
        {countries.map((country, i) => (
          <option  key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

export default Countrypicker;
