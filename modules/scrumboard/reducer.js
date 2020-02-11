import { UPDATE_CONFIG, ADD_ITEM, CHANGE_COLUMN } from './actions'

export default (state = { scrumboard: {} }, action) => {
  switch (action.type) {
  case UPDATE_CONFIG: {
    return {
      disableDivider: state.disableDivider,
      columns: action.configObj.columns,
      items: action.configObj.items,
    }
  }
  case ADD_ITEM: {
    return {
      ...state,
      items: [...state.items, {
        ...action.item,
        id: state.items.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1,
      }],
    }
  }
  case CHANGE_COLUMN: {
    return {
      ...state,
      items: state.items.map((item) => {
        return item.id === action.itemId ? Object.assign({}, item, { columnId: action.columnId }) : item
      }),
    }
  }
  default: return state
  }
}
