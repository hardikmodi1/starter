// import * as bcrypt from 'bcryptjs'
// import { Connection } from 'typeorm'
// import { User } from '../../../entity/User'
// import { gCall } from '../../../test-utils/gCall'
// import { testConn } from '../../../test-utils/testConn'
// import {
//   passwordIncorrect,
//   userDoesNotExist,
// } from '../../constants/errorMessages'
// import { loginMutation } from '../../graphql/user/mutation/loginMutation'
// import { meQuery } from '../../graphql/user/query/meQuery'
// // tslint:disable-next-line
// const faker = require('faker')

// let conn: Connection
// const user = {
//   email: faker.internet.email(),
//   username: faker.internet.userName(),
//   password: faker.internet.password(),
// }
// let dbUser: User
// beforeAll(async () => {
//   conn = await testConn()
//   dbUser = await User.create({
//     email: user.email,
//     password: await bcrypt.hash(user.password, 12),
//     username: user.username,
//   }).save()
// })

// afterAll(async () => {
//   await conn.close()
// })

// describe('Test for login', () => {
//   it('Invalid login', async () => {
//     const response = await gCall({
//       source: loginMutation,
//       variableValues: {
//         usernameOrEmail: faker.internet.userName(),
//         password: faker.internet.password(),
//       },
//     })
//     expect(response.data!.login).toMatchObject([
//       {
//         path: 'usernameOrEmail',
//         message: userDoesNotExist,
//       },
//     ])
//   })
//   it('Incorrect password', async () => {
//     const response = await gCall({
//       source: loginMutation,
//       variableValues: {
//         usernameOrEmail: user.email,
//         password: faker.internet.password(),
//       },
//     })
//     const response2 = await gCall({
//       source: loginMutation,
//       variableValues: {
//         usernameOrEmail: faker.internet.email(),
//         password: user.password,
//       },
//     })
//     expect(response.data!.login).toMatchObject([
//       {
//         path: 'password',
//         message: passwordIncorrect,
//       },
//     ])
//     expect(response2.data!.login).toMatchObject([
//       {
//         path: 'usernameOrEmail',
//         message: userDoesNotExist,
//       },
//     ])
//   })

//   it('Valid login with email', async () => {
//     const response = await gCall({
//       source: loginMutation,
//       variableValues: {
//         usernameOrEmail: user.email,
//         password: user.password,
//       },
//     })
//     expect(response.data!.login).toBeNull()
//     const response2 = await gCall({
//       source: meQuery,
//       userId: dbUser.id,
//     })
//     expect(response2.data!.me).toMatchObject({
//       email: user.email,
//       username: user.username,
//     })
//   })

//   it('Valid login with username', async () => {
//     const response = await gCall({
//       source: loginMutation,
//       variableValues: {
//         usernameOrEmail: user.username,
//         password: user.password,
//       },
//     })
//     expect(response.data!.login).toBeNull()
//     const response2 = await gCall({
//       source: meQuery,
//       userId: dbUser.id,
//     })
//     expect(response2.data!.me).toMatchObject({
//       email: user.email,
//       username: user.username,
//     })
//   })
// })
