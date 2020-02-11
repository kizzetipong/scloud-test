const _ = require('lodash')

const TASK_INITIAL = [
  {
    id: '001',
    title: 'STORY-001',
    content: 'Enhance visual design for Card',
    owner: 'Designer A',
    columnId: '01',
    color: '#ffff97',
  },
  {
    id: '002',
    title: 'STORY-002',
    content: 'Automatic card\'s size adjustment by amount of cards',
    owner: 'Frontend Dev A',
    columnId: '01',
  },
  {
    id: '003',
    title: 'STORY-003',
    content: 'Create a basic Web App, which displays some useful data',
    owner: 'Pong',
    columnId: '04',
    color: '#79cb45',
  },
  {
    id: '004',
    title: 'STORY-004',
    content: 'Retrieve configuration from websocket connection',
    owner: 'Pong',
    columnId: '03',
    color: '#79cb45',
  },
  {
    id: '005',
    title: 'STORY-005',
    content: 'Support Url Parameters for overridding configuration',
    owner: 'Pong',
    columnId: '03',
    color: '#79cb45',
  },
  {
    id: '006',
    title: 'STORY-006',
    content: 'Discuss this app face-to-face',
    owner: 'Pong',
    columnId: '02',
    color: '#79cb45',
  },
  {
    id: '007',
    title: 'STORY-007',
    content: 'Create Admin page to manage scrumboard',
    owner: 'Frontend Dev A',
    columnId: '01',
  },
  {
    id: '008',
    title: 'STORY-008',
    content: 'Integrate api\'s models to PostgreSQL',
    owner: 'Backend Dev A',
    columnId: '01',
  },
  {
    id: '009',
    title: 'STORY-009',
    content: 'Validate api input with Joi',
    owner: 'Backend Dev A',
    columnId: '02',
  },
  {
    id: '010',
    title: 'STORY-010',
    content: 'Make layout responsive for small screen',
    owner: 'Designer A',
    columnId: '02',
  },
]

module.exports = (() => {
  let instance

  const init = () => {
    let inMemoryModel = TASK_INITIAL // TODO: Connect to real database
    const thisObj = {
      getAll: () => inMemoryModel,
      find: (id) => _.find(inMemoryModel, { id }),
      add: (id, header) => {
        if (thisObj.find(id)) {
          return null
        }
        const column = { id, header }
        inMemoryModel = [...inMemoryModel, column]
        return inMemoryModel
      },
      update: (id, title, content, owner, columnId, color) => {
        const updateTaskIdx = _.findIndex(inMemoryModel, { id })
        if (updateTaskIdx > -1) {
          inMemoryModel.splice(updateTaskIdx, 1, {
            id,
            title,
            content,
            owner,
            columnId,
            color,
          })
          return true
        }
        return false
      },
      delete: (id) => {
        const removeTask = thisObj.find(id)
        if (removeTask) {
          _.remove(inMemoryModel, { id })
          return true
        }
        return false
      },
    }

    return thisObj
  }

  return {
    getInstance: () => {
      if (!instance) { instance = init() }
      return instance
    },
  }
})()
