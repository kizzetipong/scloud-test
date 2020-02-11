const _ = require('lodash')
const axios = require('axios')
const config = require('../config')()

//TODO: Implement approriated error handling
const callBoardData = (done) => {
  try {
    axios.all([
      axios.get(`${config.api.url}:${config.api.port}/api/statuscolumn`),
      axios.get(`${config.api.url}:${config.api.port}/api/task`),
    ]).then(axios.spread((statuscolumn, task) => {
      return done(null, { columns: _.get(statuscolumn, 'data'), items: _.get(task, 'data') })
    })).catch((error) => {
      return done(error, null)
    })
  } catch (error) {
    return done(error, null)
  }
}

function dbSync(io) {
  return {
    getBoardData: (roomId) => {
      if (roomId === 'configuration') {
        callBoardData((err, result) => {
          if (err) {
            console.error(err)
          } else {
            if (result) {
              console.log('send data to configuration room')
              io.of('/').to('configuration').emit('data', result)
            }
          }
        })
      }
      return
    },
  }
}

module.exports = dbSync