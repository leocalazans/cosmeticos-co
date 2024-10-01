// src/components/molecules/SearchBar.spec.js
import { render, fireEvent } from '@testing-library/vue';
import SearchBar from './SearchBar.vue';

test('it should emit search event on button click', async () => {
  const { getByPlaceholderText, getByText, emitted } = render(SearchBar);

  const input = getByPlaceholderText('Buscar produto...');
  const button = getByText('Buscar');

  await fireEvent.update(input, 'Shampoo');
  await fireEvent.click(button);

  expect(emitted().search[0]).toEqual(['Shampoo']);
});
