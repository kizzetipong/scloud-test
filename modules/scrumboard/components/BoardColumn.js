import React from 'react'
import { Box, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  statusColumn: {
    minWidth: 200,
    borderRadius: theme.spacing(0.5),
    margin: theme.spacing(1),
    textAlign: 'center',
    height: '100%',
  },
  columnInnerContainer: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 4,
    height: '100%',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const BoardColumn = ({ id, header, disableDivider, children }) => {
  const classes = useStyles()
  return (
    <Box key={id} className={classes.statusColumn} flex={'1 1 0'}>
      <div className={classes.columnInnerContainer}>
        <Typography variant='h5'>{header}</Typography>
        { disableDivider ? '' : <Divider variant='middle' classes={{ root: classes.divider}}/> }
        { children }
      </div>
    </Box>
  )
}

export default BoardColumn