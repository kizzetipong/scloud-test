const _ = require('lodash')
const router = require('express').Router()
const model = require('../models/task').getInstance()

router.get('/', (req, res) => {
  const allColumns = model.getAll()
  res.json(allColumns)
})

router.get('/:id', (req, res) => {
  const { params } = req
  const task = model.find(params.id)
  if (task) {
    res.json(task)
  } else {
    res.status(404).send(`task id ${params.id} is not found`)
  }
})

router.put('/:id', (req, res) => {
  const { params, body } = req
  const { title, content, owner, columnId, color } = body
  const success = model.update(params.id, title, content, owner, columnId, color)
  if (success) {
    res.status(200).send('Update Success')
  } else {
    res.status(500).send(`task id ${params.id} is failed to update`)
  }
})

router.delete('/:id', (req, res) => {
  const { params } = req
  const delSuccess = model.delete(params.id)
  if (delSuccess) {
    res.status(200).send('Delete Success')
  } else {
    res.status(500).send(`task id ${params.id} is failed to delete`)
  }
})

module.exports = router
