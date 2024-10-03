// CoproductCard.stories.ts
import CoproductCard from './CoproductCard.vue'

export default {
  title: 'Components/CoproductCard',
  component: CoproductCard,
  argTypes: {
    product: {
      control: {
        type: 'object'
      }
    }
  }
}

const Template = (args) => ({
  components: { CoproductCard },
  setup() {
    return { args }
  },
  template: '<div style="width:300px"><CoproductCard v-bind="args" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  product: {
    id: 1,
    name: 'Produto Exemplo',
    image: 'https://via.placeholder.com/150', // URL da imagem do produto
    rating: 4.5,
    newPrice: 99.99,
    oldPrice: 129.99
  }
}

export const WithoutOldPrice = Template.bind({})
WithoutOldPrice.args = {
  product: {
    id: 2,
    name: 'Produto Sem Preço Antigo',
    image: 'https://via.placeholder.com/150',
    rating: 3.5,
    newPrice: 49.99
  }
}

export const WithoutRating = Template.bind({})
WithoutRating.args = {
  product: {
    id: 3,
    name: 'Produto Sem Avaliação',
    image: 'https://via.placeholder.com/150',
    newPrice: 29.99
  }
}
