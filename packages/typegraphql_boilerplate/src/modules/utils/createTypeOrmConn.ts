import { createConnection, getConnectionOptions } from 'typeorm'
import { User } from '../../entity/User'

export const createTypeOrmConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
  console.log(process.env.NODE_ENV)
  return process.env.NODE_ENV === 'production'
    ? createConnection({
        name: 'default',
        type: 'postgres',
        port: 5432,
        host: process.env.DB_HOST || 'localhost',
        username: 'postgres',
        password: 'postgres',
        database: 'test',
        url: process.env.DATABASE_URL,
        synchronize: true,
        logging: true,
        entities: [User],
      } as any)
    : createConnection({ ...connectionOptions, name: 'default' })
}
