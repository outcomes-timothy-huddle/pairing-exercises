import axios from 'axios'
import React, { Component } from 'react'

export default class PatientMedList extends Component {
  constructor () {
    super()
    this.state = {
      loading: true,
      medications: []
    }
  }

  componentDidMount () {
    axios.get('http://localhost:8008/medications')
      .then(r => this.setState({ medications: r.data, loading: false }))
      .catch(e => console.log(e))
  }

  render () {
    const { medications, loading } = this.state

    if (loading) return <div data-testid='loading'>Please wait....</div>
    else return (
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
          {medications.map(this.renderMedListRow)}
        </tbody>
      </table>
    )
  }

  renderMedListRow (medication) {
    return (
      <tr key={medication.id} className="medRow" data-testid='med-row'>
        <td>{medication.name}</td>
        <td>{medication.directionsForUse.toUpperCase()}</td>
        <td>{medication.condition.toUpperCase()}</td>
        <td>{medication.prescriber.name.toUpperCase()}</td>
      </tr>
    )
  }
}
