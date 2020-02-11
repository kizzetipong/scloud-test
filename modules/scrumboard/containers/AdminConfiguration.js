import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Box, TextField, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    padding: theme.spacing(6, 2),
    overflow: 'hidden',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500,
  },
}))

const AdminConfiguration = ({ configuration, socket }) => {
  const classes = useStyles()
  const [input, setInput] = useState({})

  useEffect(() => {
    setInput(JSON.stringify(configuration))
  }, [configuration])

  useEffect(() => {
    if (socket && process.browser) {
      socket.emit('join', 'configuration')
      socket.on('data', dataHandler)
      return () => socket.off('data', dataHandler)
    }
  }, [socket])

  const dataHandler = (configuration) => {
    setInput(JSON.stringify(configuration))
  }

  const postCallback = (data) => {
    const { code, msg } = data
    console.log(`status ${code}: ${msg}`)
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const onSave = () => {
    //TODO: Validate input before save to api/socket
    const jsonInput = JSON.parse(input)
    //TODO: If we have good editor, we can manage to call APIs (add/update/delete) per columns/items
    socket.emit('postchannel', { channel: 'configuration', eventname: 'data', msg: jsonInput } , postCallback)
  }

  //TODO: Create appropriated editor instead of plain JSON textfield
  return (
    <Box className={classes.container}>
      <TextField
        id='multiline-flexible'
        className={classes.textField}
        label='Configuration'
        multiline
        rowsMax='20'
        value={input}
        onChange={handleChange}
      />
      <Button
        variant='contained'
        onClick={onSave}
      >
        Save
      </Button>
    </Box>
  )
}

const mapStateToProps = state => ({
  configuration: state.scrumboard,
})

export default connect(mapStateToProps)(AdminConfiguration)