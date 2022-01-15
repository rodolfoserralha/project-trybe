import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const starWarsUrl = 'https://swapi-trybe.herokuapp.com/api/planets/';

export default function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues:
      [{
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      }],
  });

  async function callApi() {
    const response = await fetch(starWarsUrl).then((res) => res.json());
    setData(response.results);
  }

  useEffect(() => {
    callApi();
  }, []);

  const context = { data, filter, setFilter };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
