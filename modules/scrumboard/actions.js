// constants
export const UPDATE_CONFIG = 'scrumboard/UPDATE_CONFIG'
export const ADD_ITEM = 'scrumboard/ADD_ITEM'
export const CHANGE_COLUMN = 'scrumboard/CHANGE_COLUMN'

// action creators
export const updateConfig = configObj => ({ type: UPDATE_CONFIG, configObj })
export const addItem = item => ({ type: ADD_ITEM, item })
export const changeColumn = (itemId, columnId) => ({ type: CHANGE_COLUMN, itemId, columnId })
