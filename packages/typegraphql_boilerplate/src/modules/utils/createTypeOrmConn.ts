import { createConnection, getConnectionOptions } from 'typeorm'

export const createTypeOrmConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
  console.log(process.env.NODE_ENV)
  return process.env.NODE_ENV === 'production'
    ? createConnection({
        name: 'default',
        type: 'postgres',
        port: 5432,
        host: process.env.DB_HOST,
        username: 'postgres',
        password: 'postgres',
        database: 'diary',
        synchronize: false,
        logging: true,
        entities: ['../../entity/*.ts'],
      } as any)
    : createConnection({ ...connectionOptions, name: 'default' })
}
