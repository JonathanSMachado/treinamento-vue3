import { validateEmptyAndEmail, validateEmptyAndLength3 } from '../../src/utils/validators'

describe('Validators utils', () => {
  it('should be an error if no pass param to validateEmptyAndLength3', () => {
    expect(validateEmptyAndLength3()).toBe('*Este campo é obrigatório.')
  })

  it('should be an error if param less to three char on validateEmptyAndLength3', () => {
    expect(validateEmptyAndLength3('12')).toBe('*Este campo precisa no mínimo 3 caracteres.')
  })

  it('should be true if correct param pass to validateEmptyAndLength3', () => {
    expect(validateEmptyAndLength3('1234')).toBeTruthy()
  })

  it('should be an error if no pass param to validateEmptyAndEmail', () => {
    expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório.')
  })

  it('should be an error if pass invalid param to validateEmptyAndEmail', () => {
    expect(validateEmptyAndEmail('jonathan@')).toBe('*Este campo precisa ser um e-mail')
  })

  it('should be true if correct param pass to validateEmptyAndEmail', () => {
    expect(validateEmptyAndEmail('jonathansmachado@gmail.com')).toBeTruthy()
  })
})
