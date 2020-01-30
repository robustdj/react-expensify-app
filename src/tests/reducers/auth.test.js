import authReducer from '../../reducers/auth'

const uid = 'some-uid-123'

test('should set uid', () => {
  const loginAction = {
    type: 'LOGIN',
    uid 
  }
  const state = authReducer({}, loginAction)
  expect(state).toEqual({ uid })
})

test('should clear uid', () => {
  const logoutAction = {
    type: 'LOGOUT'
  }
  const state = authReducer({ uid }, logoutAction)
  expect(state).toEqual({})
})