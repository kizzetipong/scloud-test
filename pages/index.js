import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container } from '@material-ui/core'
import { Scrumboard } from '../modules/scrumboard'

const useStyles = makeStyles(() => ({
  fullContainer: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#fecf00',
  },
  fullHeight: {
    height: '100%',
  },
}))

const Index = ({ pathname, socket }) => {
  const classes = useStyles()

  //TODO: Support Url Parameters for overridding configuration
  const urlParam = {}

  return (
    <div id='app-root' className={classes.fullContainer}>
      <Container classes={{ root: classes.fullHeight}} maxWidth='xl'>
        <Scrumboard urlParam={urlParam} socket={socket} />
      </Container>
    </div>
  )
}

export default Index