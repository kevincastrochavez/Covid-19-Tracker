import React, { useState, useEffect } from 'react';
import { 
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import InfoBox from './infoBox';
import Map from './map';
import Table from './table';
import './app.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2
            }));

          setTableData(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = 
      countryCode === "worldwide" 
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      console.log('url', url)

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (

    <div className="app">
      <div className="app__left">
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

          <InfoBox 
            title="Coronavirus Cases" 
            cases={countryInfo.todayCases} 
            total={countryInfo.cases} 
            />

          <InfoBox 
            title="Recovered" 
            cases={countryInfo.todayRecovered} 
            total={countryInfo.recovered}
            />

          <InfoBox 
            title="Deaths" 
            cases={countryInfo.todayDeaths} 
            total={countryInfo.deaths} 
            />

        </div>

        <Map />

      </div>

      <Card className="app__right">
        <CardContent>

          <h3>Live Cases by Country</h3>

          <Table countries={tableData} />

          <h3>Worldwide new Cases</h3>

        </CardContent>
      </Card>

    </div>
  );
}

export default App;
