import { useEffect, useState } from 'react';
import DataFetchAPI from '../services/DataFetchAPI';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const [tableHeads, setTableHeads] = useState([]);
  const [find, setFind] = useState('');
  const [filters, setFilters] = useState([]);

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
      <table>
        <thead>
          <tr>
            { tableHeads.map((e) => (
              <th key={ e }>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planetsFilter.map((planet) => (
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
        </tbody>
      </table>
    </div>
  );
}
