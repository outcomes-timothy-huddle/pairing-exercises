import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function PatientMedList () {
  const [{ medications, loading }, setState] = useState({ medications: [], loading: true })

  useEffect(() => {
    axios.get('http://localhost:8008/medications')
      .then(r => setState({ medications: r.data, loading: false }))
      .catch(e => console.log(e))
  }, [])

  if (loading) return <div data-testid='loading'>Please wait....</div>
  else return <MedList medications={medications} />
}

function MedList ({ medications }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Directions for Use</th>
          <th>Condition</th>
          <th>Prescriber</th>
        </tr>
      </thead>
      <tbody>
        {medications.map(med => <MedListRow medication={med} key={med.id} />)}
      </tbody>
    </table>
  )
}

function MedListRow ({ medication }) {
  return (
    <tr className="medRow" data-testid='med-row'>
      <td>{medication.name}</td>
      <td>{medication.directionsForUse.toUpperCase()}</td>
      <td>{medication.condition.toUpperCase()}</td>
      <td>{medication.prescriber.name.toUpperCase()}</td>
    </tr>
  )
}
