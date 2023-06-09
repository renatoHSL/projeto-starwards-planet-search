const DataFetchAPI = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const result = await response.json();
  return result.results;
};

export default DataFetchAPI;
