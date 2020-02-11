const router = require('express').Router()
const model = require('../models/statuscolumn').getInstance()

router.get('/', (req, res) => {
  const allColumns = model.getAll()
  res.json(allColumns)
})

router.get('/:id', (req, res) => {
  const { params } = req;
  const statuscolumn = model.find(params.id);
  if (statuscolumn) {
    res.json(statuscolumn);
  } else {
    res.status(404).send(`statuscolumn id ${params.id} is not found`);
  }
});

router.put('/:id', (req, res) => {
  const { params, body } = req
  const { header } = body
  const success = model.update(params.id, header)
  if (success) {
    res.status(200).send('Update Success')
  } else {
    res.status(500).send(`statuscolumn id ${params.id} is failed to update`)
  }
})

router.delete('/:id', (req, res) => {
  const { params } = req
  const delSuccess = model.delete(params.id)
  if (delSuccess) {
    res.status(200).send('Delete Success')
  } else {
    res.status(500).send(`statuscolumn id ${params.id} is failed to delete`)
  }
})

module.exports = router
