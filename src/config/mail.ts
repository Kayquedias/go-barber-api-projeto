interface IMailConfig {
  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  defaults: {
    from: {
      email: process.env.EMAIL,
      name: 'Flaviano Go barber',
    },
  },
} as IMailConfig
