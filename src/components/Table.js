import { useEffect, useState } from 'react';
import DataFetchAPI from '../services/DataFetchAPI';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const [tableHeads, setTableHeads] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      const tablePlanets = await DataFetchAPI();
      setPlanets(tablePlanets);
      const heads = Object.keys(tablePlanets[0]).filter((e) => e !== 'residents');
      setTableHeads(heads);
    };

    fetching();
  }, []);

  return (
    <div>

      <table>
        <thead>
          <tr>
            { tableHeads.map((e) => (
              <th key={ e }>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
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
