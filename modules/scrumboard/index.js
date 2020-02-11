import * as scrumboardActions from './actions'
import scrumboardReducer from './reducer'
import ScrumboardContainer from './containers/Scrumboard'
import AdminConfigurationContainer from './containers/AdminConfiguration'
import state from './initialState'

export const actions = scrumboardActions
export const reducer = scrumboardReducer
export const Scrumboard = ScrumboardContainer
export const AdminConfiguration = AdminConfigurationContainer
export const initialState = state
