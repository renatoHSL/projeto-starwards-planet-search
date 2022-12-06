import { useEffect, useState } from 'react';
import DataFetchAPI from '../services/DataFetchAPI';

export default function Table() {
  const [arrumar, setArrumar] = useState('');
  const [fato, setFato] = useState(0);
  const [conjunto, setConjunto] = useState([]);
  // const [filterRight, setFilterRight] = useState([]); // setPlanets
  const [start, setStart] = useState('population');
  const [planets, setPlanets] = useState([]); // setFilterRight
  const [tableHeads, setTableHeads] = useState([]);
  // const [find, setFind] = useState('');
  const [data, setData] = useState([]);
  // const [filters, setFilters] = useState([]);
  const [colunas, setColunas] = useState('population');
  const [handle, setHandle] = useState('maior que');
  const [valor, setValor] = useState(0);
  const [numeroFiltro, setNumeroFiltro] = useState(null);
  const [opcao, setOpcao] = useState(['surface_water', 'diameter', 'orbital_period',
    'rotation_period', 'population']);

  useEffect(() => {
    const fetching = async () => {
      const tablePlanets = await DataFetchAPI();
      setPlanets(tablePlanets);
      setData(tablePlanets);
      const heads = Object.keys(tablePlanets[0]).filter((e) => e !== 'residents');
      setTableHeads(heads);
    };

    fetching();
  }, []);
  // const filterName = planets.filter((e) => e.name.includes(e.value));
  const filterName = ({ target: { value } }) => setPlanets(data
    .filter(({ name }) => name.includes(value)));

  // const planetsFilter = filterName.filter((e) => {
  //   if (filters.length === 0) {
  //     return true;
  //   }
  //   setFilters(e);
  //   return null;
  // });

  const handleConditioning = (element) => {
    switch (element) {
    case 'maior que':
      if (numeroFiltro === null) {
        setNumeroFiltro(planets
          .filter((elementos) => +elementos[colunas] > +valor));
      } else {
        setNumeroFiltro(numeroFiltro
          .filter((elementos) => +elementos[colunas] > +valor));
      }
      break;
    case 'menor que':
      if (numeroFiltro === null) {
        setNumeroFiltro(planets
          .filter((elementos) => +elementos[colunas] < +valor));
      } else {
        setNumeroFiltro(numeroFiltro
          .filter((elementos) => +elementos[colunas] < +valor));
      }
      break;
    case 'igual a':
      if (numeroFiltro === null) {
        setNumeroFiltro(planets
          .filter((elementos) => +elementos[colunas] === +valor));
      } else {
        setNumeroFiltro(numeroFiltro
          .filter((elementos) => +elementos[colunas] === +valor));
      }
      break;
    default:
    }
    setOpcao(opcao.filter((elementos) => elementos !== colunas));
    setColunas('population');
  };

  const typeStyleUnion = (element) => {
    if (numeroFiltro === null) {
      return setPlanets(element);
    }
    return setNumeroFiltro(element);
  };
  const conjuntoTipo = () => {
    let base = [];
    if (numeroFiltro === null) {
      base = planets;
      return base;
    }
    base = numeroFiltro;
    return base;
  };
  const ordemMaior = () => {
    const Piece = -1;
    if (arrumar === 'CRESCENTE') {
      return setConjunto(conjuntoTipo().sort((alfa, omega) => {
        if (omega[start] === 'unknown') return Piece;

        return +alfa[start] - +omega[start];
      }));
    }
    if (arrumar === 'DECRESCENTE') {
      return setConjunto(conjuntoTipo().sort((alfa, omega) => {
        if (omega[start] === 'unknown') return Piece;
        return +omega[start] - +alfa[start];
      }));
    }
  };
  useEffect(() => {
    typeStyleUnion(conjunto);
  }, [fato]);

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
            onChange={ filterName }
          />
        </label>
      </div>
      <select
        data-testid="column-filter"
        value={ colunas }
        onChange={ ({ target: { value } }) => setColunas(value) }
      >
        {opcao.length > 0 && opcao.map((elementos) => (
          <option key={ elementos } value={ elementos }>{elementos}</option>
        ))}
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

      <select
        name="column-sort"
        data-testid="column-sort"
        onChange={ ({ target: { value } }) => setStart(value) }
      >
        <option value="population">population</option>
        <option value="rotation_period">rotation_period</option>
        <option value="orbital_period">orbital_period</option>
        <option value="surface_water">surface_water</option>
        <option value="diameter">diameter</option>
      </select>
      Crescente
      <input
        type="radio"
        value="CRESCENTE"
        data-testid="column-sort-input-asc"
        name="sort"
        onChange={ ({ target: { value } }) => setArrumar(value) }
      />
      Decrescente
      <input
        type="radio"
        value="DECRESCENTE"
        data-testid="column-sort-input-desc"
        name="sort"
        onChange={ ({ target: { value } }) => setArrumar(value) }
      />
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => {
          ordemMaior();
          const Muitos = 500;
          setTimeout(() => {
            setFato(fato + 1);
          }, Muitos);
        } }
      >
        Agrupar
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
          {data.length > 0 && numeroFiltro === null
           && planets.map((planet) => (
             <tr key={ planet.name }>
               <td data-testid="planet-name">{planet.name}</td>
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
              <td data-testid="planet-name">{planetInfo.name}</td>
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
