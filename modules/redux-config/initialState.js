// this initial state is used for server-side rendering as well
import { initialState as scrumboard } from '../scrumboard'

// merge all initial states and export
export default Object.assign({},
  scrumboard,
)
