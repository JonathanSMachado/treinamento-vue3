import mockAxios from 'axios'
import AuthService from '../../src/services/auth'

jest.mock('axios')

describe('AurhService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a token when user login', async () => {
    const token = '123.123.123'
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } })
    })

    const response = await AuthService(mockAxios).login({ email: 'jonathan@gmail.com', password: '1234' })
    expect(response.data).toHaveProperty('token')
    expect(response).toMatchSnapshot()
  })

  it('should return on user when user register', async () => {
    const user = {
      name: 'Jonathan',
      password: '1234',
      email: 'jonathan@gmail.com'
    }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user })
    })

    const response = await AuthService(mockAxios).register(user)
    expect(response.data).toHaveProperty('name')
    expect(response.data).toHaveProperty('password')
    expect(response.data).toHaveProperty('email')
    expect(response.data).toMatchSnapshot()
  })
})
