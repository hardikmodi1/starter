import { createConnection, getConnectionOptions } from 'typeorm'
import { User } from '../../entity/User'

export const createTypeOrmConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
  console.log(connectionOptions)
  console.log(process.env.DB_HOST)
  return process.env.NODE_ENV === 'production'
    ? createConnection({
        ...connectionOptions,
        entities: [User],
      } as any)
    : createConnection({ ...connectionOptions, name: 'default' })
}
