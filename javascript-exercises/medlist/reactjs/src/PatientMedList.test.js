import { render } from '@testing-library/react'
import Axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import React from 'react'
import PatientMedList from "./PatientMedList"

describe('medlist', () => {
  let mock
  let originalLog

  beforeAll(() => {
    originalLog = console.log
    console.log = jest.fn()
  })

  afterAll(() => { console.log = originalLog })

  beforeEach(() => { mock = new MockAdapter(Axios, { delayResponse: 200 }) })

  afterEach(() => { mock.restore() })

  it('Shows loading message before ajax call is complete', async () => {
    const { findByTestId } = render(<PatientMedList />)
    const wait = await findByTestId('loading')
    expect(wait).toBeVisible()
  })

  it('Table renders with medications', async () => {
    mock.onGet().replyOnce(200, [
      {
        id: "44e5a1ac-e0e8-4db7-a82f-9cab17b743e0",
        name: 'Asprin',
        directionsForUse: 'Take 1 tablet',
        condition: 'Headache',
        prescriber: { name: "Self", id: "3a37dbe8-d5f1-4784-bfc2-eb17afe74f1b" }
      },
      {
        id: "1111111-e0e8-4db7-a82f-9cab17b743e0",
        name: 'NAPROXEN',
        directionsForUse: 'Take 1 tablet',
        condition: 'Back pain',
        prescriber: { name: "Joe Smith", id: "ddddddddd-d5f1-4784-bfc2-eb17afe74f1b" }
      }
    ])

    const { findAllByTestId, queryByTestId, queryByText } = render(<PatientMedList />)

    const rows = await findAllByTestId('med-row')
    expect(queryByTestId('loading')).not.toBeInTheDocument()

    expect(rows.length).toBe(2)

    expect(rows[0]).toContainElement(queryByText('Asprin'))
    expect(rows[1]).toContainElement(queryByText('NAPROXEN'))
  })
})
