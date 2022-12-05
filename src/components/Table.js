import { useEffect, useState } from 'react';
import DataFetchAPI from '../services/DataFetchAPI';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const [tableHeads, setTableHeads] = useState([]);
  const [find, setFind] = useState('');
  const [filters, setFilters] = useState([]);
  const [colunas, setColunas] = useState('population');
  const [handle, setHandle] = useState('maior que');
  const [valor, setValor] = useState(0);
  const [numeroFiltro, setNumeroFiltro] = useState(null);

  useEffect(() => {
    const fetching = async () => {
      const tablePlanets = await DataFetchAPI();
      setPlanets(tablePlanets);
      const heads = Object.keys(tablePlanets[0]).filter((e) => e !== 'residents');
      setTableHeads(heads);
    };

    fetching();
  }, []);

  const filterName = planets.filter((e) => e.name.includes(find));
  const planetsFilter = filterName.filter((e) => {
    if (filters.length === 0) {
      return true;
    }
    setFilters(e);
    return null;
  });

  const handleConditioning = (element) => {
    switch (element) {
    case 'maior que':
      setNumeroFiltro(planetsFilter
        .filter((elemento) => (+elemento[colunas] > +valor)));
      break;
    case 'menor que':
      setNumeroFiltro(planetsFilter
        .filter((elemento) => (+elemento[colunas] < +valor)));
      break;
    case 'igual a':
      setNumeroFiltro(planetsFilter
        .filter((elemento) => (+elemento[colunas] === +valor)));
      break;
    default:
    }
  };

  return (
    <div>
      <div>
        <label
          htmlFor="search"
        >
          <input
            data-testid="name-filter"
            name="name-filter"
            type="text"
            placeholder="Escreve aqui o nome"
            value={ find }
            onChange={ (e) => setFind(e.target.value) }
          />
        </label>
      </div>
      <select
        data-testid="column-filter"
        value={ colunas }
        onChange={ ({ target: { value } }) => setColunas(value) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ handle }
        onChange={ ({ target: { value } }) => setHandle(value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ valor }
        onChange={ ({ target: { value } }) => setValor(value) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => handleConditioning(handle) }
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            { tableHeads.map((e) => (
              <th key={ e }>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {planetsFilter.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))} */}
          {planetsFilter.length > 0 && numeroFiltro === null
           && planetsFilter.map((planet) => (
             <tr key={ planet.name }>
               <td>{planet.name}</td>
               <td>{planet.rotation_period}</td>
               <td>{planet.orbital_period}</td>
               <td>{planet.diameter}</td>
               <td>{planet.climate}</td>
               <td>{planet.gravity}</td>
               <td>{planet.terrain}</td>
               <td>{planet.surface_water}</td>
               <td>{planet.population}</td>
               <td>{planet.films}</td>
               <td>{planet.created}</td>
               <td>{planet.edited}</td>
               <td>{planet.url}</td>
             </tr>
           ))}
          {numeroFiltro !== null && numeroFiltro.map((planetInfo) => (
            <tr key={ planetInfo.name }>
              <td>{planetInfo.name}</td>
              <td>{planetInfo.rotation_period}</td>
              <td>{planetInfo.orbital_period}</td>
              <td>{planetInfo.diameter}</td>
              <td>{planetInfo.climate}</td>
              <td>{planetInfo.gravity}</td>
              <td>{planetInfo.terrain}</td>
              <td>{planetInfo.surface_water}</td>
              <td>{planetInfo.population}</td>
              <td>{planetInfo.films}</td>
              <td>{planetInfo.created}</td>
              <td>{planetInfo.edited}</td>
              <td>{planetInfo.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
