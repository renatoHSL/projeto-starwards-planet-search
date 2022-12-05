import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import requestAPI from '../services/DataFetchAPI';
import StarContext from './StarContext';

export default function StarProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const fetch = async () => {
    setPlanets(await requestAPI());
  };

  useEffect(() => {
    fetch();
  }, []);

  const value = useMemo(() => ({ planets }), [planets]);

  return (
    <StarContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
