import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext';
import trList, { tdList, indicatorType } from '../helpers';

export default function Table() {
  const { data, filter, setFilter } = useContext(MyContext);

  const [filteredData, setFilteredData] = useState([]);
  const [dropDownValue, setDropDownValue] = useState('population');
  const [indicator, setIndicator] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [dropDownOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  // function comparison(asa) {
  //   if (indicator === 'maior que') return dropDownValue > valueFilter;
  //   if (indicator === 'menor que') return dropDownValue < valueFilter;
  //   if (indicator === 'igual a') return dropDownValue === valueFilter;
  // }

  useEffect(() => {
    if (data.length !== 0) {
      setFilteredData(data);
    }
  }, [data]);

  function setValuesFilter({ target }) {
    setFilter({ ...filter, filterByName: { name: target.value } });
    setFilteredData(
      data.filter((planet) => planet.name.toLowerCase().includes(target.value)),
    );
  }

  function onClickButton() {
    setFilter({ ...filter,
      filterByNumericValues: [
        {
          column: dropDownValue,
          comparison: indicator,
          value: valueFilter,
        },
      ] });

    const indexDropDown = dropDownOptions.indexOf(dropDownValue);
    dropDownOptions.splice(indexDropDown, 1);

    if (indicator === 'maior que') {
      setFilteredData(data
        .filter((planet) => Number(planet[dropDownValue]) > Number(valueFilter)));
    } if (indicator === 'menor que') {
      setFilteredData(data
        .filter((planet) => Number(planet[dropDownValue]) < Number(valueFilter)));
    } if (indicator === 'igual a') {
      setFilteredData(data
        .filter((planet) => Number(planet[dropDownValue]) === Number(valueFilter)));
    }
  }

  return (
    <div id="container">
      <div id='header-div'>
      <h1>Projeto Star Wars</h1>
      <form className="inputs">
        <label htmlFor="name-filter">
          <input
            data-testid="name-filter"
            type="text"
            placeholder="Filtrar por nome"
            onChange={ setValuesFilter }
          />
        </label>

        <label htmlFor="column-filter">
          <select
            data-testid="column-filter"
            onChange={ (e) => setDropDownValue(e.target.value) }
          >
            { dropDownOptions.map((item) => <option key={ item }>{item}</option>) }
          </select>
        </label>
        { indicatorType(setIndicator) }

        <label htmlFor="value-filter">
          <input
            data-testid="value-filter"
            type="number"
            value={ valueFilter }
            onChange={ (e) => setValueFilter(e.target.value) }
          />
        </label>

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => onClickButton() }
        >
          Filtrar
        </button>
      </form>
      </div>

      <table>
        <thead>
          { trList() }
        </thead>

        <tbody>
          { filteredData
            .map((planet, index) => (
              tdList(planet, index)
            ))}
        </tbody>
      </table>
    </div>
  );
}
