import { createConnection, getConnectionOptions } from 'typeorm'
;(async (): Promise<void> => {
  const options = await getConnectionOptions('default')
  createConnection({ ...options, name: 'default' })

  const options2 = await getConnectionOptions('mongo')
  createConnection({ ...options2, name: 'mongo' })
})()
console.log('Database Connection Established!!')
