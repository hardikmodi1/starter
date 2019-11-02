import { Connection } from 'typeorm'
import { User } from '../../../entity/User'
import { gCall } from '../../../test-utils/gCall'
import { testConn } from '../../../test-utils/testConn'
import {
  emailExist,
  passwordNotLongEnough,
  usernameExist,
} from '../../constants/errorMessages'
import { registerMutation } from '../../graphql/user/mutation/registerMutation'
// tslint:disable-next-line
const faker = require('faker')

let conn: Connection
beforeAll(async () => {
  conn = await testConn()
})

afterAll(async () => {
  await conn.close()
})

describe('Test for register', () => {
  it('Invalid email', async done => {
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: {
          email: faker.internet.userName(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
        },
      },
    })
    expect(response.data!.register).toMatchObject([
      {
        path: 'email',
        message: 'email must be a valid email',
      },
    ])
    done()
  })

  it('Short password', async done => {
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: {
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: 'kl',
        },
      },
    })
    expect(response.data!.register).toMatchObject([
      {
        path: 'password',
        message: passwordNotLongEnough,
      },
    ])
    done()
  })

  it('Duplicate email/username', async done => {
    const user = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    }
    // user with duplicate username
    const duplicateEmail = {
      ...user,
      username: faker.internet.userName(),
    }
    // creating user
    await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    })
    // user with duplicate username
    const response2 = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    })
    // user with duplicate email
    const response3 = await gCall({
      source: registerMutation,
      variableValues: {
        data: duplicateEmail,
      },
    })
    expect(response2.data!.register).toMatchObject([
      {
        path: 'username',
        message: usernameExist,
      },
    ])
    expect(response3.data!.register).toMatchObject([
      {
        path: 'email',
        message: emailExist,
      },
    ])
    const dbUser = await User.find({ where: { email: user.email } })
    expect(dbUser).toBeDefined()
    expect(dbUser).toHaveLength(1)
    done()
  })

  it('Create valid user', async done => {
    const user = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    }
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    })
    expect(response.data!.register).toBeNull()
    const dbUser = await User.findOne({ where: { email: user.email } })
    expect(dbUser).toBeDefined()
    expect(dbUser!.email).toEqual(user.email)
    done()
  })
})
