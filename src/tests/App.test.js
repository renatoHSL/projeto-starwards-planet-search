import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import  mockData from './helpers/mockData';
import StarProvider from '../context/StarProvider';
import StarContext from '../context/StarContext';
import userEvent from '@testing-library/user-event';



describe('Test the App', () => {
  it('y', () => {

    render(
    <StarProvider>
      <App />
    </StarProvider>);

    const nameFilter = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.findByTestId(/'comparison-filter'/i);
    const valueFilter = screen.getByTestId('value-filter');


    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(columnFilter).toHaveLength(5);
    waitFor(() => expect(comparisonFilter).toBeInTheDocument())
    waitFor(() => expect(comparisonFilter).toHaveLength(3))
    expect(valueFilter).toBeInTheDocument();
  });

  it('id', () => {
      global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
      <StarProvider>
        <App />
      </StarProvider>);

      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledWith('https://swapi.dev/api/planets');
  });

  it('i', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
      <StarProvider>
        <App />
      </StarProvider>);

      const filterButton = screen.getByRole('button', { name: 'Filtrar' });
      expect(filterButton).toBeInTheDocument();
  });

  // it('if remove all filters button renders correctly', () => {
  //   global.fetch = jest.fn(async () => ({
  //     json: async () => mockData
  //   }));

  //   render(
  //   <StarProvider>
  //     <App />
  //   </StarProvider>);

  //   const buttonRemoveFilter = screen.getByTestId("button-remove-filters");

  //   waitFor(() => expect(buttonRemoveFilter).toBeInTheDocument())
  // });


  it('i', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
      <StarProvider>
        <App />
      </StarProvider>);

      const table = screen.getAllByRole('row');
      waitFor(() => expect(table).toHaveLength(10));
  });

  it('y', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
      <StarProvider>
        <App />
      </StarProvider>);

    const filter = screen.getAllByRole('combobox');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByRole('button', { name: 'Filtrar' });
    userEvent.selectOptions(filter[0], ['orbital_period']);
    userEvent.selectOptions(filter[1], ['maior que']);
    userEvent.type(valueFilter, '5000');
    userEvent.click(filterButton);
    const result = screen.getAllByRole('row');
    // const buttonRemoveFilter = screen.getByText("Remove Filter");
    const planet = screen.findByText("Bespin");


    waitFor(() => expect(result).toHaveLength(1));
    waitFor(() => expect(planet).toBeInTheDocument());
    // waitFor(() => expect(buttonRemoveFilter).toBeInTheDocument())
    // userEvent.click(buttonRemoveFilter);
    // waitFor(() => expect(buttonRemoveFilter).not.toBeInTheDocument())


  })

  it('i', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
      <StarProvider>
        <App />
      </StarProvider>);

    const filter = screen.getAllByRole('combobox');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByRole('button', { name: 'Filtrar' });

    userEvent.selectOptions(filter[0], ['population']);
    userEvent.selectOptions(filter[1], ['menor que']);
    userEvent.type(valueFilter, "200000");
    userEvent.click(filterButton);
    const result = screen.getAllByRole('row');

    const planet = screen.findByText("Tatooine");

    waitFor(() => expect(result).toHaveLength(1));
    waitFor(() => expect(planet).toBeInTheDocument());
// Following doubt on Slack helped me to build this test
    //https://trybecourse.slack.com/archives/C03G5SRQSLE/p1666455730429019?thread_ts=1666384155.632839&cid=C03G5SRQSLE
  })

  it('if the `eqectly ', () => {
      global.fetch = jest.fn(async () => ({
        json: async () => mockData
      }));

      render(
        <StarProvider>
          <App />
        </StarProvider>);

      const filter = screen.getAllByRole('combobox');
      const valueFilter = screen.getByTestId('value-filter');
      const filterButton = screen.getByRole('button', { name: 'Filtrar' });
      userEvent.selectOptions(filter[0], ['rotation_period']);
      userEvent.selectOptions(filter[1], ['igual a']);
      userEvent.type(valueFilter, '26');
      userEvent.click(filterButton);
      const result = screen.getAllByRole('row');

        waitFor(() => expect(result).toHaveLength(1));
  });
  it('if comparison filter combined with text input works correctly', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));

    render(
      <StarProvider>
        <App />
      </StarProvider>);

      const filter = screen.getAllByRole('combobox');
      const valueFilter = screen.getByTestId('value-filter');
      const filterButton = screen.getByRole('button', { name: 'Filtrar' });
      userEvent.selectOptions(filter[0], ['orbital_period']);
      userEvent.selectOptions(filter[1], ['maior que']);
      userEvent.type(valueFilter, '5000');
      userEvent.click(filterButton);
      const result = screen.getAllByRole('row');
      const nameFilter = screen.getByRole('textbox', { type: 'text' });
      userEvent.type(nameFilter, 't' );
      const result2 = screen.getAllByRole('row');

      waitFor(() => expect(result).toHaveLength(1));
      waitFor(() => expect(result2).toHaveLength(0));
  });

  it('Ordene os planetas do maior período orbital para o menor período orbital', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData
    }));
    render(<StarProvider><App /></StarProvider>);
    const columnSort = screen.getByTestId('column-sort')
    const columnSortInputDesc = screen.getByTestId('column-sort-input-desc')
    const columnSortButton = screen.getByTestId('column-sort-button')
    fireEvent.change(columnSort, 'orbital_period')
    userEvent.click(columnSortInputDesc)
    userEvent.click(columnSortButton)
  
    const planetName = await screen.findAllByTestId('planet-name')
    waitFor(() => expect(planetName[0]).toHaveTextContent('Bespin'));
    waitFor(() => expect(planetName[1]).toHaveTextContent('Yavin IV'));
    waitFor(() => expect(planetName[2]).toHaveTextContent('Hoth'));
    waitFor(() => expect(planetName[3]).toHaveTextContent('Kamino'));
    waitFor(() => expect(planetName[4]).toHaveTextContent('Endor'));
    waitFor(() => expect(planetName[5]).toHaveTextContent('Coruscant'));
    waitFor(() => expect(planetName[6]).toHaveTextContent('Alderaan'));
    waitFor(() => expect(planetName[7]).toHaveTextContent('Dagobah'));
    waitFor(() => expect(planetName[8]).toHaveTextContent('Naboo'));
    waitFor(() => expect(planetName[9]).toHaveTextContent('Tatooine'));
    });

    it('Ordene os planetas do menor diâmetro para o maior diâmetro', async () => {
      global.fetch = jest.fn(async () => ({
        json: async () => mockData
      }));
    render(<StarProvider><App /></StarProvider>);
    const columnSort = screen.getByTestId('column-sort')
    const columnSortInputAsc = screen.getByTestId('column-sort-input-asc')
    const columnSortButton = screen.getByTestId('column-sort-button')
    fireEvent.change(columnSort, 'diameter')
    userEvent.click(columnSortInputAsc)
    userEvent.click(columnSortButton)
  
    const planetName = await screen.findAllByTestId('planet-name')
    waitFor(() => expect(planetName[0]).toHaveTextContent('Endor'));
    waitFor(() => expect(planetName[1]).toHaveTextContent('Hoth'));
    waitFor(() => expect(planetName[2]).toHaveTextContent('Dagobah'));
    waitFor(() => expect(planetName[3]).toHaveTextContent('Yavin IV'));
    waitFor(() => expect(planetName[4]).toHaveTextContent('Tatooine'));
    waitFor(() => expect(planetName[5]).toHaveTextContent('Naboo'));
    waitFor(() => expect(planetName[6]).toHaveTextContent('Coruscant'));
    waitFor(() => expect(planetName[7]).toHaveTextContent('Alderaan'));
    waitFor(() => expect(planetName[8]).toHaveTextContent('Kamino'));
    waitFor(() => expect(planetName[9]).toHaveTextContent('Bespin'));
    });

});


  