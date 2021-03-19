import { shallowMount } from '@vue/test-utils'
import Playground from '../../../src/views/Playground'

describe('<Playground />', () => {
  it('should component render correctly', () => {
    const wrapper = shallowMount(Playground)
    expect(wrapper).toMatchSnapshot()
  })
})
