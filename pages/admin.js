import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { AdminConfiguration } from '../modules/scrumboard'

const useStyles = makeStyles(() => ({
  fullContainer: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#fecf00',
  },
}))

const Admin = ({ socket }) => {
  const classes = useStyles()

  return (
    <div id='admin-root' className={classes.fullContainer}>
      <AdminConfiguration socket={socket} />
    </div>
  )
}

export default Admin