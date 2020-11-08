import React from 'react'
import { render, screen } from '#app/utils/test-utils'

import AdminPrizeTextField from '../AdminPrizeTextField'

describe('AdminPrizeTextField component', () => {
  const props = {
    className: '',
    label: '',
    value: ''
  }

  it('Should render the <AdminPrizeTextField /> component', () => {
    render(<AdminPrizeTextField name='Some Field' onChange={jest.fn()} />, { props })
    expect(screen.getByTestId('admin-prize-textfield')).toBeTruthy()
  })
})
