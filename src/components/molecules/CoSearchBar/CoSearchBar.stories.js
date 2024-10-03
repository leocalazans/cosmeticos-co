import CoSearchBar from '@/components/molecules/CoSearchBar/CoSearchBar.vue';

export default {
  title: 'Molecules/CoSearchBar', // Defina a hierarquia no Storybook
  component: CoSearchBar,
  argTypes: {
    searchQuery: {
      control: 'text',
      description: 'Texto de entrada para busca',
      defaultValue: '',
    },
    filteredProducts: {
      control: 'object',
      description: 'Produtos filtrados baseados na busca',
      defaultValue: [],
    },
  },
};

const Template = (args) => ({
  components: { CoSearchBar },
  setup() {
    return { args };
  },
  template: '<CoSearchBar v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  searchQuery: '',
  filteredProducts: [
    { id: 1, name: 'Produto 1', image: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Produto 2', image: 'https://via.placeholder.com/40' },
    { id: 3, name: 'Produto 3', image: 'https://via.placeholder.com/40' },
  ],
};
