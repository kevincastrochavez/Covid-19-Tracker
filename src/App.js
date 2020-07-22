import React, { useState, useEffect } from 'react';
import { 
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import InfoBox from './infoBox';
import './App.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));
        setCountries(countries)
      });
    };

    getCountriesData();
  }, [])

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (

    <div className="App">

      <div className="app__header">
        <h1>Covid Tracker</h1>
        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={onCountryChange}
          >

            <MenuItem value="worldwide">Worldwide</MenuItem>

            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }

          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
        <InfoBox title="Recovered" cases={123} total={325}/>
        <InfoBox title="Deaths" cases={123} total={189} />
      </div>

    </div>
  );
}

export default App;
