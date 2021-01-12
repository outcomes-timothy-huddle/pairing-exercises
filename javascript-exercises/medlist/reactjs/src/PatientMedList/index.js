import FunctionalPatientMedList from './FunctionalPatientMedList'
import ClassPatientMedList from './ClassPatientMedList'

const USE_FUNCTIONAL = false
const MedList = USE_FUNCTIONAL ? FunctionalPatientMedList : ClassPatientMedList

export default MedList
