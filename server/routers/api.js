const router = require('express').Router()
const Statuscolumn = require('../api/controllers/statuscolumn')
const Task = require('../api/controllers/task')

router.use('/statuscolumn', Statuscolumn)
router.use('/task', Task)

module.exports = router
