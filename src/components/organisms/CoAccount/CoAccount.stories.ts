import CoAccount from './CoAccount.vue'

export default {
  title: 'Components/CoAccount',
  component: CoAccount
}

const Template = (args) => ({
  components: { CoAccount },
  setup() {
    return { args }
  },
  template:
    '<div style="position:relative; width:600px;background:red"><CoAccount v-bind="args" /><div>'
})

export const LoggedOut = Template.bind({})
LoggedOut.args = {}

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  isLoggedIn: true,
  userName: 'Jane Doe'
}

// Exemplo de uma história que pode simular a visibilidade da conta
export const AccountVisible = Template.bind({})
AccountVisible.args = {
  isAccountVisible: true,
  isLoggedIn: true,
  userName: 'John Doe'
}
