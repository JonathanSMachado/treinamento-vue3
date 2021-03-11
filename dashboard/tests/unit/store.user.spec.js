import userStore from '../../src/hooks/useStore'
import { resetUserStore, setCurrentUser } from '../../src/store/user'

describe('UserStore', () => {
  afterEach(() => {
    resetUserStore()
  })

  it('should set current user', () => {
    const store = userStore()
    setCurrentUser({ name: 'Jonathan' })

    expect(store.User.currentUser.name).toBe('Jonathan')
  })
})
