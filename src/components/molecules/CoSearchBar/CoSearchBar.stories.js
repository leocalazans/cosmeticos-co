// src/components/molecules/SearchBar.stories.js
import SearchBar from './SearchBar.vue';

export default {
  title: 'Molecules/SearchBar',
  component: SearchBar,
};

const Template = (args) => ({
  components: { SearchBar },
  setup() {
    return { args };
  },
  template: '<SearchBar v-bind="args" />',
});

export const Default = Template.bind({});
