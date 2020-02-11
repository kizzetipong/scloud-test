const _ = require('lodash');

const STATUSCOLUMN_INITIAL = [
  {
    id: '01',
    header: 'OPEN',
  },
  {
    id: '02',
    header: 'IN PROGRESS',
  },
  {
    id: '03',
    header: 'RESOLVE',
  },
  {
    id: '04',
    header: 'DONE',
  },
]

module.exports = (() => {
  let instance;

  const init = () => {
    let inMemoryModel = STATUSCOLUMN_INITIAL; // TODO: Connect to real database
    const thisObj = {
      getAll: () => inMemoryModel,
      find: (id) => _.find(inMemoryModel, { id }),
      add: (id, header) => {
        if (thisObj.find(id)) {
          return null;
        }
        const column = { id, header };
        inMemoryModel = [...inMemoryModel, column];
        return inMemoryModel;
      },
      update: (id, header) => {
        const updateColumnIdx = _.findIndex(inMemoryModel, { id })
        if (updateColumnIdx > -1) {
          inMemoryModel.splice(updateColumnIdx, 1, {
            id,
            header,
          })
          return true
        }
        return false
      },
      delete: (id) => {
        const removeColumn = thisObj.find(id)
        if (removeColumn) {
          _.remove(inMemoryModel, { id })
          return true
        }
        return false
      },
    };

    return thisObj;
  };

  return {
    getInstance: () => {
      if (!instance) { instance = init(); }
      return instance;
    },
  };
})();
